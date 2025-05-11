import axios from "axios";

export async function fetchOpenAI(content) {
  try {
    const res = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama3-70b-8192",
        messages: [
          {
            role: "user",
            content: `다음 한국어 문장을 한국어로 간단하게 요약해줘.\n\n"${content}"`,
          },
        ],
        temperature: 0.7,
        max_tokens: 1024,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error("API 요청 실패:");
    console.dir(error.response?.data);
    throw error;
  }
}
