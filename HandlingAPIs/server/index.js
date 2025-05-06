import express from 'express';

const app = express();


app.get('/', (req, res) => {
    res.send('Hellow World!')
})

app.get('/api/products', (req, res) => {
    const products = [
        { id: 1, name: "Wireless Mouse", price: 499 },
        { id: 2, name: "Mechanical Keyboard", price: 2299 },
        { id: 3, name: "HD Monitor", price: 8499 },
        { id: 4, name: "USB-C Hub", price: 799 },
        { id: 5, name: "External SSD 1TB", price: 6499 },
        { id: 6, name: "Webcam 1080p", price: 1999 },
        { id: 7, name: "Bluetooth Speaker", price: 1499 },
        { id: 8, name: "Smartwatch", price: 3599 },
        { id: 9, name: "Portable Charger", price: 899 },
        { id: 10, name: "Laptop Stand", price: 999 }
    ];

    // http://localhost:3000/api/products?search=Mechanical
    if (req.query.search) {
        const filterProducts = products.filter((product) =>
            product.name.includes(req.query.search));
        res.send(filterProducts)
        return;

    }
    setTimeout(() => {
        res.send(products)
    }, 0.1000)
})


const port =process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})