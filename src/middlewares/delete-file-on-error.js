import fs from 'fs';

export const deleteFileOnError = (filePath) => {
    if (fs.existsSync(filePath)) {
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error(`Error al eliminar el archivo: ${filePath}`, err);
            } else {
                console.log(`Archivo eliminado: ${filePath}`);
            }
        });
    }
};