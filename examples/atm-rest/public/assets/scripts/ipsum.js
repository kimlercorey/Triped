angular.module("ipsum", [])

.directive("ipsum", function(ipsumService) {
    return {
        restrict: "AE",
        link: function(scope,elem,attrs) {
        	var opts = attrs["ipsum"].match(/\d+(-*\d+)*\w/g);
        	var str = '';
        	for(var i = 0, l = opts.length; i < l; i++)
        	{
        		var num = opts[i].match(/(\d+(-*\d+)*)/)[1];
        		var type = opts[i].match(/w|s|p/)[0];

        		switch(type) {
        			case "w":
	        			str += ipsumService.words(num) + ' ';
	        			break;
        			case "s":
	        			str += ipsumService.sentences(num) + ' ';
	        			break;
        			case "p":
                        //console.log(num);
        				str += ipsumService.paragraphs(num);
	        			break;
        		}
        	}
            elem.html(str.trim());
        }
    }
})

.directive("ipsumName", function(ipsumService) {
    return {
        restrict: "AE",
        link: function(scope,elem,attrs) {
            var opts = attrs["ipsumName"].match(/^[fmr][fml]+/g);
            var str = '';

            var sex = opts[0][0].toLowerCase();
            var format = opts[0].substring(1).toLowerCase().split('');

            var firstName;

            if(sex === 'm')
            {
                firstName = ipsumService.randomMale();
            } 
            else if(sex === 'f')
            {
                firstName = ipsumService.randomFemale();
            }
            else 
            {
                firstName = ipsumService.randomFirst();
            }

            for(var i = 0, l = format.length; i<l; i++)
            {
                if(format[i] === 'f')
                {
                    str += firstName + ' ';
                }
                else if(format[i] === 'm')
                {
                    str += ipsumService.randomMi() + ' ';
                }
                else
                {
                    str += ipsumService.randomLast() + ' ';
                }
            }

            elem.text(str.trim());
        }
    }
})

.service("ipsumService", function() {

    var self = this;

    var rand = function (min, max) {
        max = parseInt(max);
        min = parseInt(min);
        var r = Math.floor(Math.random() * (max - min + 1) + min); 
        return r > max ? max : r;
    };

    self.maleFirstNames = ['James','John','Robert','Michael','William','David','Richard','Charles','Joseph','Thomas','Christopher','Daniel','Paul','Mark','Donald','George','Kenneth','Steven','Edward','Brian','Ronald','Anthony','Kevin','Jason','Matthew','Gary','Timothy','Jose','Larry','Jeffrey','Frank','Scott','Eric','Stephen','Andrew','Raymond','Gregory','Joshua','Jerry','Dennis','Walter','Patrick','Peter','Harold','Douglas','Henry','Carl','Arthur','Ryan','Roger','Joe','Juan','Jack','Albert','Jonathan','Justin','Terry','Gerald','Keith','Samuel','Willie','Ralph','Lawrence','Nicholas','Roy','Benjamin','Bruce','Brandon','Adam','Harry','Fred','Wayne','Billy','Steve','Louis','Jeremy','Aaron','Randy','Howard','Eugene','Carlos','Russell','Bobby','Victor','Martin','Ernest','Phillip','Todd','Jesse','Craig','Alan','Shawn','Clarence','Sean','Philip','Chris','Johnny','Earl','Jimmy','Antonio','Danny','Bryan','Tony','Luis','Mike','Stanley','Leonard','Nathan','Dale','Manuel','Rodney','Curtis','Norman','Allen','Marvin','Vincent','Glenn','Jeffery','Travis','Jeff','Chad','Jacob','Lee','Melvin','Alfred','Kyle','Francis','Bradley','Jesus','Herbert','Frederick','Ray','Joel','Edwin','Don','Eddie','Ricky','Troy','Randall','Barry','Alexander','Bernard','Mario','Leroy','Francisco','Marcus','Micheal','Theodore','Clifford','Miguel','Oscar','Jay','Jim','Tom','Calvin','Alex','Jon','Ronnie','Bill','Lloyd','Tommy','Leon','Derek','Warren','Darrell','Jerome','Floyd','Leo','Alvin','Tim','Wesley','Gordon','Dean','Greg','Jorge','Dustin','Pedro','Derrick','Dan','Lewis','Zachary','Corey','Herman','Maurice','Vernon','Roberto','Clyde','Glen','Hector','Shane','Ricardo','Sam','Rick','Lester','Brent','Ramon','Charlie','Tyler','Gilbert','Gene','Marc','Reginald','Ruben','Brett','Angel','Nathaniel','Rafael','Leslie','Edgar','Milton','Raul','Ben','Chester','Cecil','Duane','Franklin','Andre'];
    self.femaleFirstNames = ['Mary','Patricia','Linda','Barbara','Elizabeth','Jennifer','Maria','Susan','Margaret','Dorothy','Lisa','Nancy','Karen','Betty','Helen','Sandra','Donna','Carol','Ruth','Sharon','Michelle','Laura','Sarah','Kimberly','Deborah','Jessica','Shirley','Cynthia','Angela','Melissa','Brenda','Amy','Anna','Rebecca','Virginia','Kathleen','Pamela','Martha','Debra','Amanda','Stephanie','Carolyn','Christine','Marie','Janet','Catherine','Frances','Ann','Joyce','Diane','Alice','Julie','Heather','Teresa','Doris','Gloria','Evelyn','Jean','Cheryl','Mildred','Katherine','Joan','Ashley','Judith','Rose','Janice','Kelly','Nicole','Judy','Christina','Kathy','Theresa','Beverly','Denise','Tammy','Irene','Jane','Lori','Rachel','Marilyn','Andrea','Kathryn','Louise','Sara','Anne','Jacqueline','Wanda','Bonnie','Julia','Ruby','Lois','Tina','Phyllis','Norma','Paula','Diana','Annie','Lillian','Emily','Robin','Peggy','Crystal','Gladys','Rita','Dawn','Connie','Florence','Tracy','Edna','Tiffany','Carmen','Rosa','Cindy','Grace','Wendy','Victoria','Edith','Kim','Sherry','Sylvia','Josephine','Thelma','Shannon','Sheila','Ethel','Ellen','Elaine','Marjorie','Carrie','Charlotte','Monica','Esther','Pauline','Emma','Juanita','Anita','Rhonda','Hazel','Amber','Eva','Debbie','April','Leslie','Clara','Lucille','Jamie','Joanne','Eleanor','Valerie','Danielle','Megan','Alicia','Suzanne','Michele','Gail','Bertha','Darlene','Veronica','Jill','Erin','Geraldine','Lauren','Cathy','Joann','Lorraine','Lynn','Sally','Regina','Erica','Beatrice','Dolores','Bernice','Audrey','Yvonne','Annette','June','Samantha','Marion','Dana','Stacy','Ana','Renee','Ida','Vivian','Roberta','Holly','Brittany','Melanie','Loretta','Yolanda','Jeanette','Laurie','Katie','Kristen','Vanessa','Alma','Sue','Elsie','Beth','Jeanne','Vicki','Carla','Tara','Rosemary','Eileen','Terri','Gertrude','Lucy','Tonya','Ella','Stacey','Wilma','Gina','Kristin','Jessie','Natalie','Agnes','Vera','Willie','Charlene','Bessie','Delores','Melinda','Pearl','Arlene','Maureen','Colleen','Allison','Tamara','Joy'];
    self.lastNames = ['Smith','Johnson','Williams','Jones','Brown','Davis','Miller','Wilson','Moore','Taylor','Anderson','Thomas','Jackson','White','Harris','Martin','Thompson','Garcia','Martinez','Robinson','Clark','Rodriguez','Lewis','Lee','Walker','Hall','Allen','Young','Hernandez','King','Wright','Lopez','Hill','Scott','Green','Adams','Baker','Gonzalez','Nelson','Carter','Mitchell','Perez','Roberts','Turner','Phillips','Campbell','Parker','Evans','Edwards','Collins','Stewart','Sanchez','Morris','Rogers','Reed','Cook','Morgan','Bell','Murphy','Bailey','Rivera','Cooper','Richardson','Cox','Howard','Ward','Torres','Peterson','Gray','Ramirez','James','Watson','Brooks','Kelly','Sanders','Price','Bennett','Wood','Barnes','Ross','Henderson','Coleman','Jenkins','Perry','Powell','Long','Patterson','Hughes','Flores','Washington','Butler','Simmons','Foster','Gonzales','Bryant','Alexander','Russell','Griffin','Diaz','Hayes','Myers','Ford','Hamilton','Graham','Sullivan','Wallace','Woods','Cole','West','Jordan','Owens','Reynolds','Fisher','Ellis','Harrison','Gibson','Mcdonald','Cruz','Marshall','Ortiz','Gomez','Murray','Freeman','Wells','Webb','Simpson','Stevens','Tucker','Porter','Hunter','Hicks','Crawford','Henry','Boyd','Mason','Morales','Kennedy','Warren','Dixon','Ramos','Reyes','Burns','Gordon','Shaw','Holmes','Rice','Robertson','Hunt','Black','Daniels','Palmer','Mills','Nichols','Grant','Knight','Ferguson','Rose','Stone','Hawkins','Dunn','Perkins','Hudson','Spencer','Gardner','Stephens','Payne','Pierce','Berry','Matthews','Arnold','Wagner','Willis','Ray','Watkins','Olson','Carroll','Duncan','Snyder','Hart','Cunningham','Bradley','Lane','Andrews','Ruiz','Harper','Fox','Riley','Armstrong','Carpenter','Weaver','Greene','Lawrence','Elliott','Chavez','Sims','Austin','Peters','Kelley','Franklin','Lawson','Fields','Gutierrez','Ryan','Schmidt','Carr','Vasquez','Castillo','Wheeler','Chapman','Oliver','Montgomery','Richards','Williamson','Johnston','Banks','Meyer','Bishop','Mccoy','Howell','Alvarez','Morrison','Hansen','Fernandez','Garza','Harvey','Little','Burton','Stanley','Nguyen','George','Jacobs','Reid','Kim','Fuller','Lynch','Dean','Gilbert','Garrett','Romero','Welch','Larson','Frazier','Burke','Hanson','Day','Mendoza','Moreno','Bowman','Medina','Fowler','Brewer','Hoffman','Carlson','Silva','Pearson','Holland','Douglas','Fleming','Jensen','Vargas','Byrd','Davidson','Hopkins','May','Terry','Herrera','Wade','Soto','Walters','Curtis','Neal','Caldwell'];
    self.alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','Z','Y','Z'];
    self.wordList = ['lorem','ipsum','dolor','sit','amet','consectetur','adipiscing','elit','vestibulum','nec','leo','sed','nisl','mattis','viverra','posuere','nec','turpis','donec','eleifend','risus','condimentum','nisl','rutrum','tincidunt','phasellus','et','libero','ipsum','nulla','facilisi','aliquam','viverra','massa','in','tincidunt','ullamcorper','augue','mi','dictum','ligula','suscipit','iaculis','tortor','risus','nec','nibh','curabitur','rhoncus','non','felis','vitae','molestie','duis','vestibulum','erat','massa','in','interdum','odio','accumsan','et','in','hac','habitasse','platea','dictumst','in','mollis','eros','nec','diam','dictum','imperdiet','vestibulum','feugiat','orci','odio','etiam','mattis','sed','leo','ac','congue','ut','vehicula','arcu','mattis','augue','consectetur','imperdiet','nunc','ac','tellus','quam','phasellus','tincidunt','rutrum','tortor','non','euismod','elit','elementum','sed','in','congue','nec','sapien','in','pretium','curabitur','a','erat','eget','metus','porttitor','imperdiet','vehicula','vehicula','purus','in','ac','ultricies','lacus','praesent','faucibus','elit','non','turpis','pellentesque','ut','feugiat','ligula','porttitor','curabitur','aliquam','hendrerit','vestibulum','fusce','nunc','est','hendrerit','tempus','ullamcorper','at','hendrerit','nec','erat','nullam','semper','blandit','consequat','proin','bibendum','nulla','in','elit','posuere','venenatis','vestibulum','nunc','dui','volutpat','faucibus','accumsan','a','eleifend','sed','arcu','pellentesque','tempus','justo','nunc','quis','tempor','risus','consequat','in','nullam','id','varius','velit','ac','dictum','odio','nunc','nec','porttitor','eros','nunc','imperdiet','in','lorem','vitae','varius','vestibulum','ante','ipsum','primis','in','faucibus','orci','luctus','et','ultrices','posuere','cubilia','curae','quisque','vitae','elit','id','turpis','semper','accumsan','eu','ac','velit','donec','non','urna','orci','nunc','pretium','leo','et','ligula','interdum','malesuada','vestibulum','leo','lectus','congue','mattis','euismod','in','faucibus','at','felis','in','laoreet','nunc','eu','nibh','iaculis','blandit','phasellus','id','nulla','interdum','dictum','dui','ut','placerat','lorem','nunc','id','augue','aliquet','sollicitudin','neque','a','mattis','purus','suspendisse','accumsan','vulputate','nibh','et','pharetra','ligula','consectetur','vel','morbi','elementum','purus','dapibus','diam','rutrum','posuere','quisque','auctor','porta','lacus','vel','convallis','urna','sodales','a','morbi','vitae','metus','nec','augue','volutpat','ornare','integer','sodales','ipsum','bibendum','elit','ultrices','aliquet','in','sollicitudin','suscipit','orci','id','tincidunt','augue','lobortis','a','nunc','sed','erat','ut','nisl','bibendum','lobortis','nulla','tempor','sollicitudin','nisi','ac','rhoncus','duis','sit','amet','arcu','elit','donec','et','imperdiet','leo','nullam','sodales','arcu','at','velit','tempor','a','imperdiet','orci','tincidunt','curabitur','sed','laoreet','erat','ac','pulvinar','sem','pellentesque','leo','orci','varius','in','ligula','vel','facilisis','ullamcorper','elit','pellentesque','tortor','mauris','tincidunt','sed','est','vitae','fermentum','posuere','odio','maecenas','venenatis','dignissim','sem','et','interdum','aliquam','ullamcorper','sit','amet','elit','ut','eleifend','fusce','tempus','ut','massa','at','vehicula','curabitur','vel','ultricies','nisl','aliquam','vestibulum','ligula','et','sagittis','sagittis','diam','magna','sagittis','ipsum','nec','fringilla','odio','ipsum','id','turpis','duis','orci','magna','luctus','quis','vehicula','vitae','condimentum','nec','lorem','morbi','scelerisque','lacus','dolor','in','aliquet','sapien','commodo','at','in','congue','dignissim','sapien','id','condimentum','dolor','eleifend','quis','vivamus','tincidunt','orci','sit','amet','ipsum','porta','ultricies','integer','cursus','quis','lorem','sit','amet','facilisis','in','semper','nunc','eu','pretium','ultrices','nam','nisi','nibh','ultricies','in','massa','eget','egestas','condimentum','ipsum','quisque','at','turpis','ut','tellus','condimentum','aliquam','ac','in','lacus','praesent','gravida','pellentesque','mauris','quis','tempus','etiam','nec','elementum','nunc','sed','aliquet','facilisis','suscipit','pellentesque','tristique','ornare','mauris','luctus','congue','phasellus'];

    self.firstNames = self.maleFirstNames.concat(self.femaleFirstNames);

    var getRandom = function (str) {
        if((str+'').indexOf('-') > -1) {
            return rand(str.split('-')[0],str.split('-')[1]);
        }
        return str;
    }

    /**
    * Get a random string of sentences in paragraph format (wrapped in <p> tags)
    * @param {int} count Number of paragraphs
    * @returns {string}
    */
    self.paragraphs = function(count) {
        count = getRandom(count);
        var paragraphs = new Array;
        for (var i = 0; i < count; i++) {
            var paragraphLength = rand(10, 20);
            var paragraph = this.sentences(paragraphLength);
            paragraphs.push("<p>" + paragraph + "</p>");
        }
        return paragraphs.join('\n').trim();
    };

    /**
    * Get a random string of words in sentence format
    * @param {int} count Number of sentences
    * @returns {string} Sentence with first letter capatalized and a period at the end.
    */
    self.sentences = function(count) {
        var sentences = new Array;
        for (var i = 0; i < count; i++) {
            var sentenceLength = rand(5, 10);
            var words = self.words(sentenceLength).split(' ');
            words[0] = words[0].substr(0, 1).toUpperCase() + words[0].substr(1);
            var sentence = words.join(' ');
            sentences.push(sentence);
        }
        return (sentences.join('. ') + '.').replace(/(\.\,|\,\.)/g, '.').trim();
    };

    /**
    * Get a random string of words
    * @param {int} count Number of words
    * @returns {string}
    */
    self.words = function(count) {
        var words = [];
        for(var i = 0; i < count; i++)
        {
            var wordIndex = rand(0, self.wordList.length - 1);
            words.push(self.wordList[wordIndex]);
        }
        return words.join(" ").trim();
    };

    /**
    * Get a random female first name
    * @returns {string}
    */
    self.randomFemale = function() {
    	return self.femaleFirstNames[rand(0, self.femaleFirstNames.length -1)];
    };

    /**
    * Get a random male first name
    * @returns {string}
    */
    self.randomMale = function() {
    	return self.maleFirstNames[rand(0, self.maleFirstNames.length -1)];
    };

    /**
    * Get a random first name
    * @returns {string}
    */
    self.randomFirst = function() {
        return self.firstNames[rand(0, self.firstNames.length -1)];
    };

    /**
    * Get a random last name
    * @returns {string}
    */
    self.randomLast = function() {
        return self.lastNames[rand(0, self.lastNames.length -1)]
    }

    /**
    * Get a random middle initial (a letter)
    * @returns {string}
    */
    self.randomMi = function() {
        return self.alphabet[rand(0, 25)];
    }

    /**
    * Get a random 'person' object - {first: '', mi: '', last: '', full: ''}
    * @param {string} [sex] m = male, f = female, r = random
    * @returns {object}
    */
    self.randomName = function(sex) {
    	sex = sex || 'r';

    	var name = {
			last: self.randomLast(),
			mi: self.randomMi()
    	};

    	switch(sex.toLowerCase()) {
    		case "m":
				name.first = self.randomMale();
    			break;
			case "f":
				name.first = self.randomFemale();
				break;
			case "r":
		    	name.first = self.randomFirst();
				break;
    	}

    	name.full = name.first + ' ' + name.mi + ' ' + name.last;
    	return name;
    };

    /**
    * Get a item from a provided list
    * @param {object[]} list array of items
    * @returns {object}
    */
    self.randomItem = function(list) {
        return list[rand(0, list.length -1)];
    }
    
})

.filter("random", function(ipsumService) {
    return function(value) {
        var list = value;
        return [ipsumService.randomItem(list)];
    }
})

if (!String.prototype.trim) {
  String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g, '');
  };
}