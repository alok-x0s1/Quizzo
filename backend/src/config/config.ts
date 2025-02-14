const _config = {
	port: process.env.PORT || 3000,
	clientUrl: process.env.CLIENT_URL || "http://localhost:5173",
	secretKey: process.env.SECRET_KEY || "secret_key",
	nodeEnv: process.env.NODE_ENV,
};

export const config = Object.freeze(_config);
