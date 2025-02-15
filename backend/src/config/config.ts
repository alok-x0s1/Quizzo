const _config = {
	port: process.env.PORT || 3000,
	clientUrl: process.env.CLIENT_URL,
	nodeEnv: process.env.NODE_ENV,
	jwtSecret: process.env.JWT_TOKEN_SECRET as string,
};

export const config = Object.freeze(_config);
