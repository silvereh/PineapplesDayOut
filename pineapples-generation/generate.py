from PIL import Image, ImageOps
import random
import json

# Declare traits
bg = ["Grey", "Hot Pink", "Red"]
bg_weight = [45, 24, 31]

sk = ["Olive", "Orange", "Pink"]
sk_weight = [18, 76, 6]

ey = ["Eyepatch", "Heart", "X"]
ey_weight = [1, 84, 15]

cr = ["Blue", "Grey", "Mixed"]
cr_weight = [35, 12, 53]

mo = ["Growl", "Straight", "Tongue Out"]
mo_weight = [63, 30, 7]

fw = ["Slides", "Socks", "None"]
fw_weight = [32, 19, 49]

ac = ["Balloon", "Kite", "None"]
ac_weight = [26, 11, 63]

bg_files = {
	"Grey"				: "Bg1",
	"Hot Pink"		: "Bg2",
	"Red"					: "Bg3"
}

sk_files = {
	"Olive"				: "Sk1",
	"Orange"			: "Sk2",
	"Pink"				: "Sk3"
}

ey_files = {
	"Eyepatch"		: "Ey1",
	"Heart"				: "Ey2",
	"X"						: "Ey3"
}

cr_files = {
	"Blue"				: "Cr1",
	"Grey"				: "Cr2",
	"Mixed"				: "Cr3"
}

mo_files = {
	"Growl"				: "Mo1",
	"Straight"		: "Mo2",
	"Tongue Out"	: "Mo3"
}

fw_files = {
	"Slides"			: "Fw1",
	"Socks"				: "Fw2"
}

ac_files = {
	"Balloon"			: "Ac1",
	"Kite"				: "Ac2"
}

# Trait Generation

TOTAL = 300

traits = []

def createSet():
	trait = {}

	trait["TokenID"] 				= ""
	trait["Background"] 		= random.choices(bg, bg_weight)[0]
	trait["Skin"] 					= random.choices(sk, sk_weight)[0]
	trait["Mouth"] 					= random.choices(mo, mo_weight)[0]
	trait["Eyes"] 					= random.choices(ey, ey_weight)[0]
	trait["Crown"] 					= random.choices(cr, cr_weight)[0]
	trait["Footwear"] 			= random.choices(fw, fw_weight)[0]
	trait["Accessories"] 		= random.choices(ac, ac_weight)[0]

	if trait in traits:
		return createSet()
	else:
		return trait

for i in range(TOTAL):
	newtrait = createSet()
	traits.append(newtrait)

# Ensure uniqueness
def allUnique(x):
	seen = list()
	return not any(i in seen or seen.append(i) for i in x)

print(allUnique(traits))

# Write Metadata to json
with open("./_assets/metadata.json", "w") as of:
	json.dump(traits, of, indent=2)

# Generate images
i = 0
for item in traits:
	if item["Background"] != "None":
		img1 = Image.open(f'./_assets/bg/{bg_files[item["Background"]]}.png').convert('RGBA')
	else:
		# : Image.open(f'./_assets/none.png').convert('RGBA')
		img1 = ""

	if item["Skin"] != "None":
		img2 = Image.open(f'./_assets/sk/{sk_files[item["Skin"]]}.png').convert('RGBA')
	else:
		# : Image.open(f'./_assets/none.png').convert('RGBA')
		img2 = ""

	if item["Mouth"] != "None":
		img3 = Image.open(f'./_assets/mo/{mo_files[item["Mouth"]]}.png').convert('RGBA')
	else:
		# : Image.open(f'./_assets/none.png').convert('RGBA')
		img3 = ""

	if item["Eyes"] != "None":
		img4 = Image.open(f'./_assets/ey/{ey_files[item["Eyes"]]}.png').convert('RGBA')
	else:
		# : Image.open(f'./_assets/none.png').convert('RGBA')
		img4 = ""

	if item["Crown"] != "None":
		img5 = Image.open(f'./_assets/cr/{cr_files[item["Crown"]]}.png').convert('RGBA')
	else:
		# : Image.open(f'./_assets/none.png').convert('RGBA')
		img5 = ""

	if item["Footwear"] != "None":
		img6 = Image.open(f'./_assets/fw/{fw_files[item["Footwear"]]}.png').convert('RGBA')
	else:
		# : Image.open(f'./_assets/none.png').convert('RGBA')
		img6 = ""

	if item["Accessories"] != "None":
		img7 = Image.open(f'./_assets/ac/{ac_files[item["Accessories"]]}.png').convert('RGBA')
	else:
		# : Image.open(f'./_assets/none.png').convert('RGBA')
		img7 = ""

	# Mash images
	if img2 == "":
		com1 = img1
	else:
		com1 = Image.alpha_composite(img1, img2)

	if img3 == "":
		com2 = com1
	else:
		com2 = Image.alpha_composite(com1, img3)

	if img4 == "":
		com3 = com2
	else:
		com3 = Image.alpha_composite(com2, img4)

	if img5 == "":
		com4 = com3
	else:
		com4 = Image.alpha_composite(com3, img5)

	if img6 == "":
		com5 = com4
	else:
		com5 = Image.alpha_composite(com4, img6)

	if img7 == "":
		com6 = com5
	else:
		com6 = Image.alpha_composite(com5, img7)


	# Convert to RGB
	result = com6.convert('RGB')

	# Save file
	filename = str(i) + ".jpg"
	result.save("./_assets/output/" + filename)
	print(f'{str(i)} done')
	i = i + 1
