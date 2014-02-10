var flashvars = {};
flashvars.cssSource = "piecemaker/piecemaker.css";
flashvars.xmlSource = "piecemaker/piecemaker.xml";

var flash_params = {};
flash_params.play = "true";
flash_params.menu = "false";
flash_params.scale = "showall";
flash_params.wmode = "transparent";
flash_params.allowfullscreen = "true";
flash_params.allowscriptaccess = "always";
flash_params.allownetworking = "all";

swfobject.embedSWF('piecemaker/piecemaker.swf', 'piecemaker', '920', '390',
		'10', null, flashvars, flash_params, null);
