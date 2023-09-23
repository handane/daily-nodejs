const express = require('express');
const app = express();
app.use(express.json());

const cars = [
   {
      id: '1ab',
      manufacture: 'Honda',
      model: 'GR Supra',
      capacity: 2,
      recentPerDay: 200000,
      description:
         'Brake assist. Leather-wrapped shift knob. Glove box lamp. Air conditioning w/in-cabin microfilter',
      availableAt: '2022-03-23T15:49:05.563Z',
   },
   {
      id: '2kkj2',
      manufacture: 'Toyota',
      model: 'Land Cruiser',
      capacity: 6,
      recentPerDay: 440000,
      description:
         'Brake assist. Leather-wrapped shift knob. Glove box lamp. Air conditioning w/in-cabin microfilter',
      availableAt: '2022-03-23T15:49:05.563Z',
   },
   {
      id: '5a89b',
      manufacture: 'Audi',
      model: 'R-N1',
      capacity: 4,
      recentPerDay: 600000,
      description:
         'Brake assist. Leather-wrapped shift knob. Glove box lamp. Air conditioning w/in-cabin microfilter',
      availableAt: '2022-03-23T15:49:05.563Z',
   },
];

app.get('/', async (req, res) => {
   try {
      res.status(200).json({
         message: 'ping successfully',
      });
   } catch (err) {
      res.status(400).json({
         status: 'failed request',
         message: err,
      });
   }
});

app.get('/cars', async (req, res) => {
   try {
      res.status(200).json({
         status: 'success',
         cars: cars,
      });
   } catch (err) {
      res.status(400).json({
         status: 'failed request',
         message: err,
      });
   }
});

app.get('/cars/:id', async (req, res) => {
   try {
      const id = req.params.id;
      let search = cars.find(function (objek) {
         return objek.id === id;
      });
      console.log(search);
      res.status(200).json({
         status: 'success id',
         cars: search,
      });
   } catch (err) {
      console.log(err);
      res.status(400).json({
         status: 'failed request',
      });
   }
});

app.post('/cars', async (req, res) => {
   try {
      const id = req.body.id;
      const manufacture = req.body.manufacture;
      const model = req.body.model;
      const capacity = req.body.capacity;
      const recentPerDay = req.body.recentPerDay;
      const description = req.body.description;
      const availableAt = req.body.availableAt;

      const addCars = {
         id: id,
         manufacture: manufacture,
         model: model,
         capacity: capacity,
         recentPerDay: recentPerDay,
         description: description,
         availableAt: availableAt,
      };
      cars.push(addCars);
      res.status(200).json({
         status: 'success',
         cars: cars,
      });
   } catch (err) {
      res.status(400).json({
         status: 'failed request',
         message: err,
      });
   }
});

app.put('/cars/:id', async (req, res) => {
   try {
      const id = req.params.id;
      const manufacture = req.body.manufacture;
      const model = req.body.model;
      const capacity = req.body.capacity;
      const recentPerDay = req.body.recentPerDay;
      const description = req.body.description;
      const availableAt = req.body.availableAt;

      const updateCars = {
         id: id,
         manufacture: manufacture,
         model: model,
         capacity: capacity,
         recentPerDay: recentPerDay,
         description: description,
         availableAt: availableAt,
      };

      let indexToUpdate = cars.findIndex(function (objek) {
         return objek.id === id;
      });

      if (indexToUpdate !== -1) {
         cars[indexToUpdate] = updateCars;
         res.status(200).json({
            message: 'success',
            cars: cars,
         });
      } else {
         throw new err('not data found');
      }

      res.status(200).json({
         status: 'success',
         cars: cars,
      });
   } catch (err) {
      res.status(400).json({
         status: 'failed request',
         message: err,
      });
   }
});

app.delete('/cars/:id', async (req, res) => {
   try {
      const id = req.params.id;
      let deleteCar = cars.filter(function (objek) {
         return objek.id !== id;
      });
      res.status(200).json({
         status: 'success',
         cars: deleteCar,
      });
   } catch (err) {
      res.status(400).json({
         status: 'failed request',
         message: err,
      });
   }
});

const port = 3000;
app.listen(port, () => {
   console.log(`App running on port ${port}..!`);
});
