import app from './config/app';
import { Environment } from './config/environment';

const PORT = Environment.config('PORT');

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});