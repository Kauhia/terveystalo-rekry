import app from "./server"

const port = 8000;
app.listen(port, () => {
    console.log(`[server]: Server is running at https://localhost:${port}`);
});