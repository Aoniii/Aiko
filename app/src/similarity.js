function similarity(s1, s2, b) {
	s1 = swap(s1.toLowerCase(), b);
	s2 = swap(s2.toLowerCase(), b);

	if (b)
		if (s1[0] != s2[0])
			return (0);

	var longer = s1;
	var shorter = s2;

	if (s1.length < s2.length) {
		longer = s2;
		shorter = s1;
	}

	var longerLength = longer.length;

	if (longerLength == 0)
		return (1.0);

	return (longerLength - distance(longer, shorter)) / parseFloat(longerLength);
}

function swap(s, b) {
	tab = ["eéèêë", "yÿ", "uûü", "iîï", "oôö", "aàâä", "cç", " '"];

	if (b) {
		s = s.replace("passif", "p");
		if (s[0] == 'a')
			s = s.replace("a", "q");
		else if (s[0] == 'z')
			s = s.replace("z", "w");
	}

	for (a = 0; a < tab.length; a++)
		for (b = 1; b < tab[a].length; b++)
			s = s.replaceAll(tab[a][b], tab[a][0]);

	return (s);
}

function distance(s1, s2) {
	var costs = new Array();

	for (var i = 0; i <= s1.length; i++) {
		var lastValue = i;

		for (var j = 0; j <= s2.length; j++) {
			if (i == 0)
				costs[j] = j;
			else {
				if (j > 0) {
					var newValue = costs[j - 1];
					if (s1.charAt(i - 1) != s2.charAt(j - 1))
						newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
					costs[j - 1] = lastValue;
					lastValue = newValue;
				}
			}
		}
		if (i > 0)
			costs[s2.length] = lastValue;
	}
	return costs[s2.length];
}

module.exports = similarity;
