import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
    PORT: number;
}

/**Este se encarga de verificar que si tenga la variable de entorno
 * y de lo contrario no levante mi app
*/

const envsSchema = joi.object({
    PORT: joi.number().required()
})
    .unknown(true) //Porque hay muchas mas variables flotando en nuestra app

const { error, value } = envsSchema.validate(process.env);
if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
    port: envVars.PORT
}