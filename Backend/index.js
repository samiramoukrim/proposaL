const express= require('express');
const app= express();
const mongoose= require('mongoose');
const serviceRoutes= require('./routes/services');
const userRoutes= require('./routes/users');
const reservationRoutes= require('./routes/reservations');
const contactRoutes= require('./routes/contact');

app.use(express.json());

app.use('/services', serviceRoutes);
app.use('/users', userRoutes);
app.use('/reservations', reservationRoutes);
app.use('/contact', contactRoutes);

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
mongoose
.connect("mongodb+srv://samiramoukrim823_db_user:code2005@cluster0.yakhixg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(() => {
    console.log('Connected to MongoDB');
})
.catch(err => {
    console.error('MongoDB connection error:', err);
});

