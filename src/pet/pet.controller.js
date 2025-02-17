import Pet from '../models/pet.model.js';

// Crear una mascota
export const createPet = async (req, res) => {
    try {
        const { name, type, age } = req.body;
        if (!name || !type || !age) return res.status(400).json({ message: 'Todos los campos son obligatorios' });

        const pet = new Pet({ name, type, age, owner: req.user.id });
        await pet.save();

        res.status(201).json({ message: 'Mascota registrada', pet });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error });
    }
};

// Obtener mascotas del usuario
export const getPetsByOwner = async (req, res) => {
    try {
        const pets = await Pet.find({ owner: req.user.id });
        res.json({ pets });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error });
    }
};

// Editar mascota
export const updatePet = async (req, res) => {
    try {
        const { petId, name, type, age } = req.body;
        const pet = await Pet.findOneAndUpdate({ _id: petId, owner: req.user.id }, { name, type, age }, { new: true });

        if (!pet) return res.status(404).json({ message: 'Mascota no encontrada o no tienes permiso' });

        res.json({ message: 'Mascota actualizada', pet });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error });
    }
};

// Eliminar mascota
export const deletePet = async (req, res) => {
    try {
        const { petId } = req.body;
        const pet = await Pet.findOneAndDelete({ _id: petId, owner: req.user.id });

        if (!pet) return res.status(404).json({ message: 'Mascota no encontrada o no tienes permiso' });

        res.json({ message: 'Mascota eliminada' });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error });
    }
};
