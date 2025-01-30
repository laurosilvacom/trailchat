import type { Message } from "ai"

export const dummyMessages: { [key: string]: Message[] } = {
  chat1: [
    { id: "1", role: "system", content: "You are ChatGPT, a large language model trained by OpenAI." },
    { id: "2", role: "user", content: "What is ChatGPT?" },
    {
      id: "3",
      role: "assistant",
      content:
        "ChatGPT is an AI-powered language model developed by OpenAI. It's designed to understand and generate human-like text based on the input it receives. ChatGPT can engage in conversations, answer questions, provide explanations, and assist with various language-related tasks.",
    },
    { id: "4", role: "user", content: "What can it do?" },
    {
      id: "5",
      role: "assistant",
      content:
        "ChatGPT can perform a wide range of tasks, including:\n\n1. Answering questions on various topics\n2. Providing explanations and clarifications\n3. Assisting with writing and editing\n4. Offering creative ideas and brainstorming\n5. Helping with problem-solving and analysis\n6. Providing coding assistance and debugging\n7. Translating languages\n8. Summarizing text\n9. Engaging in casual conversation\n\nHowever, it's important to note that while ChatGPT is highly capable, it may occasionally provide incorrect information or misunderstand context. It's always a good idea to verify important information from reliable sources.",
    },
  ],
  chat2: [
    { id: "1", role: "system", content: "You are ChatGPT, a large language model trained by OpenAI." },
    { id: "2", role: "user", content: "Can you give me some tips for creative writing?" },
    {
      id: "3",
      role: "assistant",
      content:
        "Here are some helpful tips for creative writing:\n\n1. Read extensively in various genres to expand your vocabulary and storytelling techniques.\n2. Write regularly to develop your skills and establish a writing habit.\n3. Create well-rounded, complex characters with clear motivations.\n4. Show, don't tell: Use descriptive language to immerse readers in your story.\n5. Develop a unique voice and writing style.\n6. Use sensory details to bring your scenes to life.\n7. Experiment with different narrative structures and points of view.\n8. Embrace revision and editing as crucial parts of the writing process.\n9. Seek feedback from other writers or join a writing group.\n10. Don't be afraid to take risks and try new ideas in your writing.\n\nRemember, the key to improving your creative writing is practice and persistence. Keep writing, and don't be discouraged by initial drafts – great writing often comes through revision and refinement.",
    },
  ],
  chat3: [
    { id: "1", role: "system", content: "You are ChatGPT, a large language model trained by OpenAI." },
    { id: "2", role: "user", content: "How do I start learning Python?" },
    {
      id: "3",
      role: "assistant",
      content:
        "Starting to learn Python is a great choice! Here's a step-by-step guide to help you begin:\n\n1. Install Python: Download and install the latest version of Python from python.org.\n\n2. Choose an IDE or text editor: Popular choices include PyCharm, Visual Studio Code, or IDLE (comes with Python).\n\n3. Learn the basics:\n   - Variables and data types\n   - Basic operators\n   - Conditional statements (if, else, elif)\n   - Loops (for, while)\n   - Functions\n   - Lists, tuples, and dictionaries\n\n4. Practice with simple projects:\n   - Calculator\n   - To-do list\n   - Number guessing game\n\n5. Explore libraries and modules:\n   - Standard library (e.g., math, random, datetime)\n   - Third-party libraries (e.g., NumPy, Pandas, Matplotlib)\n\n6. Learn object-oriented programming (OOP) concepts\n\n7. Work on more complex projects\n\n8. Join Python communities and forums for support\n\nRemember to practice regularly and be patient with yourself. There are many free online resources available, such as Codecademy, Python.org tutorials, and YouTube courses. Happy coding!",
    },
  ],
  chat4: [
    { id: "1", role: "system", content: "You are ChatGPT, a large language model trained by OpenAI." },
    { id: "2", role: "user", content: "What are some must-visit places in Japan?" },
    {
      id: "3",
      role: "assistant",
      content:
        "Japan offers a wealth of incredible destinations. Here are some must-visit places:\n\n1. Tokyo: The bustling capital with a mix of ultra-modern and traditional attractions.\n   - Shibuya Crossing\n   - Senso-ji Temple\n   - Tokyo Skytree\n   - Akihabara (for electronics and anime)\n\n2. Kyoto: The cultural heart of Japan.\n   - Kinkaku-ji (Golden Pavilion)\n   - Fushimi Inari Shrine\n   - Arashiyama Bamboo Grove\n   - Gion District\n\n3. Osaka: Known for its food scene and friendly locals.\n   - Osaka Castle\n   - Dotonbori\n   - Universal Studios Japan\n\n4. Mount Fuji: Japan's iconic mountain and a UNESCO World Heritage site.\n\n5. Hiroshima: Historical site and symbol of peace.\n   - Peace Memorial Park and Museum\n   - Atomic Bomb Dome\n\n6. Nara: Home to friendly deer and historic temples.\n   - Todai-ji Temple\n   - Nara Park\n\n7. Hokkaido: Northernmost main island, known for natural beauty.\n   - Sapporo (try the famous beer and ramen)\n   - Otaru (picturesque canal town)\n\n8. Okinawa: Tropical islands with beautiful beaches and unique culture.\n\n9. Japanese Alps: Great for hiking and winter sports.\n   - Kamikochi\n   - Takayama\n\n10. Kanazawa: Well-preserved Edo-period districts and beautiful garden.\n    - Kenroku-en Garden\n    - Higashi Chaya District\n\nRemember to consider Japan's seasonal attractions like cherry blossoms in spring or autumn foliage when planning your trip.",
    },
  ],
}

