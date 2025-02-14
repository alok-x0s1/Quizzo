import "dotenv/config";
import app from "./app";
import { config } from "./config/config";

const PORT = config.port;

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

export default app;
