# 🎬 FrameGuess - Guess the Movie from the Frame

**FrameGuess** is a fun and challenging web-based game where users try to guess a movie based solely on a single frame from the film. Designed for movie lovers and frame-spotting pros, this project lets users play, contribute new content, and track their guessing stats.

---

## 🕹️ What Is This Game?

- Players are shown **one frame** (screenshot) from a movie.
- They get **3 chances** to correctly guess the movie title.
- Each correct guess boosts your stats: streaks, accuracy, and more.
- Get rewarded with **funny rank titles** based on your correct guesses.
- Users can **contribute their own movie frames** to the app, helping it grow.
- In future versions, got plans to introduce:
  - 🏆 **Global Leaderboards**
  - 👥 **Multi-user profiles with authentication**
  - 🧠 **Difficulty levels and categories**

---

## 🛠️ Tech Stack

| Tech        | Description                                  |
| ----------- | -------------------------------------------- |
| Next.js 14  | React Framework (App Router + SSR)           |
| TypeScript  | Static typing for cleaner code               |
| TailwindCSS | Utility-first CSS framework                  |
| MongoDB     | NoSQL database to store movie frames & stats |
| Vercel      | Deployment and hosting                       |

---

## 📦 Features

- 🎮 **Fun gameplay** with 3 attempts to guess a movie by frame
- 📊 **User stats**: total attempts, accuracy, streaks, best streak
- 🧑‍🎨 **Contribute frames** to grow the game database
- 🧑‍💻 **Componentized React UI** with modular code structure
- 🧠 **Title Ranks**: based on your guessing performance

---

## 🏅 Rank Titles

Depending on your total correct guesses, you get a badge of honor:

| Correct Guesses | Title               |
| --------------- | ------------------- |
| 0–2             | 🎬 “Movie Noob”      |
| 3–5             | 🍿 “CineBoi”         |
| 6–9             | 📼 “FrameFinder”     |
| 10–14           | 🕵️ “Scene Sniper”    |
| 15–19           | 🎯 “GuessGod Jr.”    |
| 20–24           | 👑 “Movie Maniac”    |
| 25–29           | 🔥 “Cinema Slayer”   |
| 30+             | 🧠 “Frame Conqueror” |

---

## 🚧 Future Plans

- 🌍 Global leaderboard with highest scores & longest streaks
- 👥 Multi-user authentication and personalized profiles
- 🔒 Frame moderation and quality control for user submissions
- 🎛️ Difficulty levels and genre-based gameplay

---

## 🧪 Setup Instructions

1. **Clone the repository**  
   ```bash
   git clone https://github.com/your-username/frameguess.git
   cd frameguess
   npm install


    ```
2. **Install dependencies**  
    ```bash
    npm install 
    ```

3. **Add environment variables**
    ```bash
    MONGODB_URI=your_mongo_uri
    NEXTAUTH_SECRET=your_auth_secret
    NEXTAUTH_URL=http://localhost:3000
    ```

4.**Run locally**
    ```bash
    npm run dev
    ```


5. **Visit http://localhost:3000**