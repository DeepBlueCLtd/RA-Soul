const path = require('path');
const express = require('express');

const reactAdminClient = {
  method: 'GET',
  path: '/api/client',
  handler: (req, res, db) => {
    const clientPath = path.join(__dirname, 'dist', 'index.html');
    res.app.use(express.static(path.join(__dirname, 'dist')));
    res.sendFile(path.join(clientPath));
  },
};

module.exports = {
  reactAdminClient,
};
