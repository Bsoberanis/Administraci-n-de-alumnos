class Course {
    constructor(id, name, description, duration) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.duration = duration;
    }

    getCourseDetails() {
        return `Course: ${this.name}, Description: ${this.description}, Duration: ${this.duration} hours`;
    }
}

module.exports = Course;