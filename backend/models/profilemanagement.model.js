const mongoose = require("mongoose");

const profileManagementSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        maxlength: 50,
    },
    address1: {
        type: String,
        required: true,
        maxlength: 100,
    },
    address2: {
        type: String,
        required: false,
        maxlength: 100,
    },
    city: {
        type: String,
        required: true,
        maxlength: 100,
    },
    state: {
        type: String,
        required: true,
        enum: [
            "Alabama",
            "Alaska",
            "Arizona",
            "Arkansas",
            "California",
            "Colorado",
            "Connecticut",
            "Delaware",
            "Florida",
            "Georgia",
            "Hawaii",
            "Idaho",
            "Illinois",
            "Indiana",
            "Iowa",
            "Kansas",
            "Kentucky",
            "Louisiana",
            "Maine",
            "Maryland",
            "Massachusetts",
            "Michigan",
            "Minnesota",
            "Mississippi",
            "Missouri",
            "Montana",
            "Nebraska",
            "Nevada",
            "New Hampshire",
            "New Jersey",
            "New Mexico",
            "New York",
            "North Carolina",
            "North Dakota",
            "Ohio",
            "Oklahoma",
            "Oregon",
            "Pennsylvania",
            "Rhode Island",
            "South Carolina",
            "South Dakota",
            "Tennessee",
            "Texas",
            "Utah",
            "Vermont",
            "Virginia",
            "Washington",
            "West Virginia",
            "Wisconsin",
            "Wyoming",
        ],
    },
    zipcode: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 10,
        match: /^\d{5}(-\d{4})?$/,
    },
    skills: {
        type: String,
        required: true,
        enum: [
            "Communication",
            "Leadership",
            "Organization",
            "Time Management",
            "Problem Solving",
            "Teamwork",
            "Event Planning",
            "Customer Service",
            "First Aid/CPR",
            "Fundraising",
            "Marketing/Social Media",
            "Budgeting",
            "Multitasking",
            "Tech Skills",
        ],
    },
    preferences: {
        type: String,
        required: true,
    },
    availability: {
        type: String,
        required: true,
    },
});

const ProfileManagement = mongoose.model(
    "ProfileManagement",
    profileManagementSchema
);

export default ProfileManagement;
