const express = require('express');
const Document = require('../models/Document');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all documents
router.get('/', auth, async (req, res) => {
  try {
    const documents = await Document.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(documents);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching documents', error: error.message });
  }
});

// Create document
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, fileType, content, tags } = req.body;
    
    const document = new Document({
      user: req.user._id,
      title,
      description,
      fileType,
      fileSize: Buffer.byteLength(content || '', 'base64'),
      content,
      tags
    });
    
    await document.save();
    res.status(201).json(document);
  } catch (error) {
    res.status(500).json({ message: 'Error creating document', error: error.message });
  }
});

// Update document
router.put('/:id', auth, async (req, res) => {
  try {
    const document = await Document.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { ...req.body, version: req.body.version + 1 },
      { new: true }
    );
    
    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }
    
    res.json(document);
  } catch (error) {
    res.status(500).json({ message: 'Error updating document', error: error.message });
  }
});

// Delete document
router.delete('/:id', auth, async (req, res) => {
  try {
    const document = await Document.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    
    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }
    
    res.json({ message: 'Document deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting document', error: error.message });
  }
});

// Share document
router.post('/:id/share', auth, async (req, res) => {
  try {
    const { userIds } = req.body;
    
    const document = await Document.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { isShared: true, sharedWith: userIds },
      { new: true }
    );
    
    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }
    
    res.json(document);
  } catch (error) {
    res.status(500).json({ message: 'Error sharing document', error: error.message });
  }
});

module.exports = router;