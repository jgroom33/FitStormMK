Template.registerHelper("isSingleCycle", function (cycle) 
{
    return (1 == cycle);
});


Template.registerHelper("getBracketHeight", function (exer_len) 
{
    defaultLen = 0.3;
	if(exer_len == 1) {
		return exer_len + defaultLen;
	}
	return parseFloat(exer_len - defaultLen);
});


Template.registerHelper("centerToBracket", function (exer_len) 
{
	heightPerExercise = 2;
	if(exer_len < 3) {
		return 0;
	}
	return (((exer_len / 2) - 1) * heightPerExercise);
});