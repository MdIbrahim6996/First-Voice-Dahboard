const MODE = import.meta.env.MODE;
console.log(MODE);

export const SERVER_URL = `http://localhost:4000/api/v1`;

// export const SERVER_URL =
//     MODE === "development"
//         ? `http://localhost:4000/api/v1`
//         : "https://first-voice-dahboard.onrender.com/api/v1";
