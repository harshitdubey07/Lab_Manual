const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        validate: {
            validator: function(v) {
                return v >= 0;
            },
            message: 'Quantity cannot be negative'
        }
    },
    price: {
        type: Number,
        required: [true, 'Price is required']
    },
    supplier: {
        type: String,
        required: true
    },
    inStock: {
        type: Boolean,
        default: true
    }
});

// Pre-save middleware to automatically update inStock status
productSchema.pre('save', function(next) {
    this.inStock = this.quantity > 0;
    next();
});

// Pre-findOneAndUpdate middleware to automatically update inStock status
productSchema.pre('findOneAndUpdate', function(next) {
    const update = this.getUpdate();
    if (update.quantity !== undefined) {
        update.inStock = update.quantity > 0;
    }
    next();
});

module.exports = mongoose.model('Product', productSchema);
