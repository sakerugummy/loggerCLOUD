const dataloggerController = {};
const pool = require('../database.js');

dataloggerController.datalogger = (req, res) => {
    //console.log(req.headers);   
    if (req.method == 'POST') {
        console.log('LocalTime: '+ Date.now());
        const chunks = [];
        req.on('data', chunk => chunks.push(chunk));
        req.on('end', () => {
            const data = Buffer.concat(chunks);
            saveDataSERVER(data);
        });
    }
};

function saveDataSERVER(data){
    if(data.length>5){
        console.log(data.length);
        console.log('Data: ', data);
        // Datos del Datalogger
        var datalogger={};
        datalogger.DLEN = data[0];
        datalogger.STID = (data[4] << 24)+(data[3] << 16) + (data[2] << 8) + data[1];
        datalogger.TMID = [];
        // Tipo de Mediciones del Datalogger
        for (let b = 0; b < 8; b++) {
            const type = (0x01<<b);
            if ((data[2] & type)==type)
            datalogger.TMID.push(b);
        }
        console.log(datalogger);
        // Datos de la medicion
        var pos_regs = 5;
        var len_data = data.length - pos_regs;
        var len_regs = 4 + datalogger.TMID.length*datalogger.DLEN*2;
        var nro_regs = len_data/len_regs;
        var medicion = [];
        for (let n = 0; n < nro_regs; n++) {
            pos_regs +=  (n*len_regs);
            var pos = pos_regs;
            const MEDS = {}
            MEDS.HREG=(data[pos+3] << 24)+(data[pos+2] << 16) + (data[pos+1] << 8) + data[pos];
            MEDS.DATA=[];
            pos=pos+4;
            // Obtiene data
            for (let i=0; i<datalogger.TMID.length; i++) {                        
                var _DATA=[];
                pos +=i*datalogger.DLEN*2;
                for (let j=pos; j<pos+datalogger.DLEN*2; j=j+2) {
                    _DATA.push((data[j + 1] << 8) + data[j]);
                }                        
                MEDS.DATA.push(_DATA);
                console.log(_DATA);
            }
            medicion.push(MEDS);
            console.log(Date());
            console.log(medicion);
            
        }
    }
    // Guardar mediciones en la base de datos.
    for (let i = 0; i < medicion.length; i++) {
        for (let pos = 0; pos < datalogger.DLEN; pos++) {
            for (let t = 0; t < datalogger.TMID.length; t++) {
                pool.query('call db_loggerCLOUD.registrarMedicion(?,?,?,?) ;', [datalogger.STID+pos, datalogger.TMID[t], medicion[i].HREG,medicion[i].DATA[t][pos]]);
            }
        }
    }
}

module.exports = dataloggerController;