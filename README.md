# MenuMetrics Frontend

This is the frontend React application for the [MenuMetrics](https://github.com/PepaPanda/menumetrics) project — a lightweight tool for managing restaurants and their menu items with nutritional info.

---

## 🚀 Features

- Create, edit, and delete restaurants and menu items
- Track macros like carbohydrates, fats, sugars, proteins, salts, and fiber
- URL-driven filtering with search input
- Clean and minimal layout using custom UI components
- Full integration with the [MenuMetrics Backend](https://github.com/PepaPanda/menumetrics)

---

## ⚙️ Requirements

This frontend depends on the backend API being available locally.

You **must set up and run the backend first**:

```bash
git clone https://github.com/PepaPanda/menumetrics
cd menumetrics
npm install
npm run dev
```

And set up your .env file. 

> The backend runs on `http://localhost:3000` by default.


Full guide: https://github.com/PepaPanda/menumetrics

---

## 📦 Getting Started with the Frontend

```bash
git clone https://github.com/PepaPanda/menumetrics-frontend
cd menumetrics-frontend
npm install
cp .env.example .env
npm run dev
```

The app will start using [Vite](https://vitejs.dev/) on `http://localhost:5173` by default.

---

## 🔧 Configuration

The API base URL is configured using Vite environment variables.

Check your `.env` file:

```
VITE_API_BASE=http://localhost:3000
```

Make sure it matches your backend setup.

---

## 💡 Development Notes

- React + Vite frontend
- React Router used for navigation and route-based logic
- Controlled forms for menu items and restaurants
- Uses `useParams` and `useSearchParams` for ID-based and query-based routing

---

## 🧪 Ideas I would like to but couldn't realize in time because I do everything late

- FE Form validation and error messages
- Better decomposition of components into standalone functions, custom hooks
- darkmode
- Pre-select restaurant in menuitem detail by url params (this would be a game changer)
- Overall styling is very simple, would like to improve on that
- Loading wheel
- Error handling/popups and infoboxes - at the moment, there is pretty much nothing
- For simplicity, I'm reloading after posting. This is unnecessary.

---

## 🧑‍💻 Author

Built by [@PepaPanda](https://github.com/PepaPanda)
See more of my works at https://www.code-by-martin.com/
