var Letter = function(letter) {
	this.charac = letter,
	this.appear = false,
	this.letterRender = function() {
		if (this.appear) {
			return this.charac;
		} else if (this.charac === " ") {
			this.appear = true;
			return this.charac;
		} else {
			return " _ ";
		}
	}

};

exports.Letter = Letter;