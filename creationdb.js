db = connect('mongodb://localhost:27017/immovision');

db.cartes.insertMany([
    {
      nomLieu: 'Appartement Test',
      prix: 100000,
      localisation: 'Paris, France',
      imageUrls: [],
      siteUrl: '',
      visite: false,
      note: 4
        }
      ]);