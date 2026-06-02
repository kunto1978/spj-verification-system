const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Configure multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, process.env.UPLOAD_DIR || './uploads');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + uuidv4();
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 10485760
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = (process.env.ALLOWED_FILE_TYPES || 'pdf,doc,docx,xls,xlsx,jpg,jpeg,png').split(',');
    const ext = path.extname(file.originalname).substring(1).toLowerCase();
    
    if (allowedTypes.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('File type not allowed'));
    }
  }
});

// Mock data
const attachments = new Map();

// Upload attachment
router.post('/', upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    const { spj_id } = req.body;

    const attachment = {
      id: uuidv4(),
      spj_document_id: spj_id,
      file_name: req.file.originalname,
      file_path: req.file.path,
      file_type: req.file.mimetype,
      file_size: req.file.size,
      uploaded_by: req.user.id,
      uploaded_at: new Date()
    };

    attachments.set(attachment.id, attachment);

    res.status(201).json({
      success: true,
      message: 'File uploaded successfully',
      data: {
        id: attachment.id,
        file_name: attachment.file_name,
        file_size: attachment.file_size,
        file_type: attachment.file_type
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'File upload failed',
      error: error.message
    });
  }
});

// Download attachment
router.get('/:id/download', (req, res) => {
  try {
    const attachment = attachments.get(req.params.id);

    if (!attachment) {
      return res.status(404).json({
        success: false,
        message: 'Attachment not found'
      });
    }

    res.download(attachment.file_path, attachment.file_name);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Download failed'
    });
  }
});

// Delete attachment
router.delete('/:id', (req, res) => {
  try {
    const attachment = attachments.get(req.params.id);

    if (!attachment) {
      return res.status(404).json({
        success: false,
        message: 'Attachment not found'
      });
    }

    attachments.delete(req.params.id);

    res.json({
      success: true,
      message: 'Attachment deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Delete failed'
    });
  }
});

module.exports = router;
