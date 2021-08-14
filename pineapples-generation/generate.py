from PIL import Image, ImageOps
import sys
import random
import json

# Declare traits
bg = [
	"Light Yellow",
	"Grey",
	"Orange",
	"Light Green",
	"Hot Pink",
	"Purple",
	"Red",
	"Baby Blue",
	"Gold",
	"Rainbow"
]
bg_weight = [
	23.2,
	20,
	17,
	13,
	11,
	8,
	5,
	2,
	0.5,
	0.3
]
bg_files = {
	"Light Yellow": "bg1",
	"Grey": "bg2",
	"Orange": "bg3",
	"Light Green": "bg4",
	"Hot Pink": "bg5",
	"Purple": "bg6",
	"Red": "bg7",
	"Baby Blue": "bg8",
	"Gold": "bg9",
	"Rainbow": "bg10"
}

sk = [
	"Orange",
	"Peach",
	"Light Yellow",
	"Turquoise",
	"Hot Pink",
	"Mint Blue",
	"Plum",
	"Royal Blue",
	"Lime Green",
	"Olive Green",
	"Pastel Pink",
	"Lilac",
	"Mixed",
	"Psychedelic",
	"Gold"
]
sk_weight = [
	13.4,
	13,
	12.5,
	12,
	11.3,
	9.1,
	8,
	7.1,
	5.2,
	3.9,
	2.1,
	1,
	0.7,
	0.4,
	0.3
]
sk_files = {
	"Orange": "sk1",
	"Peach": "sk2",
	"Light Yellow": "sk3",
	"Turquoise": "sk4",
	"Hot Pink": "sk5",
	"Mint Blue": "sk6",
	"Plum": "sk7",
	"Royal Blue": "sk8",
	"Lime Green": "sk9",
	"Olive Green": "sk10",
	"Pastel Pink": "sk11",
	"Lilac": "sk12",
	"Mixed": "sk13",
	"Psychedelic": "sk14",
	"Gold": "sk15"
}

mo = [
	"Happy",
	"Sad",
	"Cheeky",
	"Angry",
	"Kissy Heart",
	"Smirk",
	"Party Horn",
	"Open",
	"Cigar",
	"Bubble Gum",
	"Vampire",
	"Toothpick",
	"Tongue Out",
	"Growl",
	"Gold Teeth",
	"Whistle",
	"Blunt",
	"Bites Lip",
	"Rainbow Teeth",
	"Drooling",
	"Yikes",
	"Censored",
	"Pacifier",
	"Golden Vampire Tooth" 
]
mo_weight = [
	7,
	6.6,
	6.5,
	6.4,
	6.4,
	6.3,
	6.3,
	6.1,
	5.7,
	5.5,
	5.1,
	4.9,
	4.4,
	4.1,
	3.8,
	3.3,
	3,
	2.5,
	2.1,
	1.7,
	1.2,
	0.7,
	0.3,
	0.1
]
mo_files = {
	"Happy": "mo1",
	"Sad": "mo2",
	"Cheeky": "mo3",
	"Angry": "mo4",
	"Kissy Heart": "mo5",
	"Smirk": "mo6",
	"Party Horn": "mo7",
	"Open": "mo8",
	"Cigar": "mo9",
	"Bubble Gum": "mo10",
	"Vampire": "mo11",
	"Toothpick": "mo12",
	"Tongue Out": "mo13",
	"Growl": "mo14",
	"Gold Teeth": "mo15",
	"Whistle": "mo16",
	"Blunt": "mo17",
	"Bites Lip": "mo18",
	"Rainbow Teeth": "mo19",
	"Drooling": "mo20",
	"Yikes": "mo21",
	"Censored": "mo22",
	"Pacifier": "mo23",
	"Golden Vampire Tooth": "mo24" 
}

ey = [
	"Default",
	"Closed",
	"Angry",
	"Sad",
	"Nerd Glasses",
	"3D Glasses",
	"Curious",
	"Blindfold",
	"Stars",
	"Lazy",
	"X",
	"Hearts",
	"High",
	"Eye Roll",
	"Shades",
	"Eye Patch",
	"Dollar Signs",
	"Googly",
	"Hypnotized" 
]
ey_weight = [
	15.6,
	14,
	11.8,
	9,
	8.1,
	7,
	6.1,
	5.4,
	4.6,
	3.7,
	3.4,
	3.1,
	2.9,
	2,
	1.2,
	1,
	0.6,
	0.4,
	0.1 
]
ey_files = {
	"Default": "ey1",
	"Closed": "ey2",
	"Angry": "ey3",
	"Sad": "ey4",
	"Nerd Glasses": "ey5",
	"3D Glasses": "ey6",
	"Curious": "ey7",
	"Blindfold": "ey8",
	"Stars": "ey9",
	"Lazy": "ey10",
	"X": "ey11",
	"Hearts": "ey12",
	"High": "ey13",
	"Eye Roll": "ey14",
	"Shades": "ey15",
	"Eye Patch": "ey16",
	"Dollar Signs": "ey17",
	"Googly": "ey18",
	"Hypnotized": "ey19" 
}

cr = [
	"Green",
	"Mustard",
	"Orange",
	"Grey",
	"Blue",
	"Purple",
	"Pink",
	"Silver",
	"Gold",
	"Mixed",
	"Broken Gold",
	"Broken Silver"
]
cr_weight = [
	24.2,
	21,
	15,
	13,
	11,
	5,
	4.7,
	2.3,
	2,
	1,
	0.4,
	0.4
]
cr_files = {
	"Green": "cr1",
	"Mustard": "cr2",
	"Orange": "cr3",
	"Grey": "cr4",
	"Blue": "cr5",
	"Purple": "cr6",
	"Pink": "cr7",
	"Silver": "cr8",
	"Gold": "cr9",
	"Mixed": "cr10",
	"Broken Gold": "cr11",
	"Broken Silver": "cr12"
}

fw = [
	"None",
	"Plain Socks",
	"Sneakers",
	"Sandals",
	"Slides",
	"Gumboots",
	"Crocs",
	"Polka Dotted Socks",
	"Timberlands",
	"Striped Socks"
]
fw_weight = [
	31.6,
	21,
	18,
	12,
	8,
	4,
	3,
	1.2,
	0.8,
	0.4
]
fw_files = {
	"Plain Socks": "fw1",
	"Sneakers": "fw2",
	"Sandals": "fw3",
	"Slides": "fw4",
	"Gumboots": "fw5",
	"Crocs": "fw6",
	"Polka Dotted Socks": "fw7",
	"Timberlands": "fw8",
	"Striped Socks": "fw9"
}

ac = [
	"None",
	"Balloon",
	"Lollipop",
	"Foam Finger",
	"Devil Horns",
	"Popsicle",
	"Security Badge",
	"Wristband",
	"Drink",
	"Baseball",
	"Lei",
	"Kite",
	"Pizza Slice",
	"Tambourine",
	"Bow-tie",
	"Binoculars",
	"Floater",
	"Magnifying Glass",
	"Underwear" 
]
ac_weight = [
	5,
	12.1,
	11.6,
	10.7,
	9.4,
	8.6,
	8,
	7.4,
	6,
	5.2,
	4,
	3.1,
	2.7,
	2,
	1.6,
	1,
	0.9,
	0.5,
	0.2 
]
ac_files = {
	"Balloon": "ac1",
	"Lollipop": "ac2",
	"Foam Finger": "ac3",
	"Devil Horns": "ac4",
	"Popsicle": "ac5",
	"Security Badge": "ac6",
	"Wristband": "ac7",
	"Drink": "ac8",
	"American Football": "ac9",
	"Lei": "ac10",
	"Kite": "ac11",
	"Pizza Slice": "ac12",
	"Tambourine": "ac13",
	"Bow-tie": "ac14",
	"Binoculars": "ac15",
	"Floater": "ac16",
	"Magnifying Glass": "ac17",
	"Underwear": "ac18" 
}

# Trait Generation

if len(sys.argv) != 1: 
	TOTAL = int(sys.argv[1])
else:
	TOTAL = 50

traits = []

def createSet():
	trait = {}

	trait["Background"] = random.choices(bg, bg_weight)[0]
	trait["Skin"] = random.choices(sk, sk_weight)[0]
	trait["Mouth"] = random.choices(mo, mo_weight)[0]
	trait["Eyes"] = random.choices(ey, ey_weight)[0]
	trait["Crown"] = random.choices(cr, cr_weight)[0]
	trait["Footwear"] = random.choices(fw, fw_weight)[0]
	trait["Accessories"] = random.choices(ac, ac_weight)[0]

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

print("All unique: " + str(allUnique(traits)))

# Name pineapples according to their number

i = 0
for item in traits:
	item["ImageNumber"] = i
	i = i + 1

# Get counts for each trait
counts = {}
counts["Background"] = {}
for item in bg:
	counts["Background"][item] = 0
counts["Skin"] = {}
for item in sk:
	counts["Skin"][item] = 0
counts["Mouth"] = {}
for item in mo:
	counts["Mouth"][item] = 0
counts["Eyes"] = {}
for item in ey:
	counts["Eyes"][item] = 0
counts["Crown"] = {}
for item in cr:
	counts["Crown"][item] = 0
counts["Footwear"] = {}
for item in fw:
	counts["Footwear"][item] = 0
counts["Accessories"] = {}
for item in ac:
	counts["Accessories"][item] = 0
counts["OneOfOne"] = 0

signatures = [72, 2836]

for pineapple in traits:
	if pineapple["ImageNumber"] in signatures:
		counts["OneOfOne"] += 1
		pineapple["Background"] = ""
		pineapple["Skin"] = ""
		pineapple["Mouth"] = ""
		pineapple["Eyes"] = ""
		pineapple["Crown"] = ""
		pineapple["Footwear"] = ""
		pineapple["Accessories"] = ""
	else:
		counts["Background"][pineapple["Background"]] += 1
		counts["Skin"][pineapple["Skin"]] += 1
		counts["Mouth"][pineapple["Mouth"]] += 1
		counts["Eyes"][pineapple["Eyes"]] += 1
		counts["Crown"][pineapple["Crown"]] += 1
		counts["Footwear"][pineapple["Footwear"]] += 1
		counts["Accessories"][pineapple["Accessories"]] += 1

with open("./_output/metadata/traitscount.json", "w") as of:
	json.dump(counts, of, indent=2)

# Write Metadata to json
with open("./_output/metadata/traits.json", "w") as of:
	json.dump(traits, of, indent=2)

# Generate images
i = 0
for item in traits:
	if item["ImageNumber"] not in signatures:
		if item["Background"] != "None":
			img1 = Image.open(f'./_assets/bg/{bg_files[item["Background"]]}.png').convert('RGBA')
		else:
			img1 = Image.open(f'./_assets/none.png').convert('RGBA')

		if item["Skin"] != "None":
			img2 = Image.open(f'./_assets/sk/{sk_files[item["Skin"]]}.png').convert('RGBA')
		else:
			img2 = Image.open(f'./_assets/none.png').convert('RGBA')

		if item["Mouth"] != "None":
			img3 = Image.open(f'./_assets/mo/{mo_files[item["Mouth"]]}.png').convert('RGBA')
		else:
			img3 = Image.open(f'./_assets/none.png').convert('RGBA')

		if item["Eyes"] != "None":
			img4 = Image.open(f'./_assets/ey/{ey_files[item["Eyes"]]}.png').convert('RGBA')
		else:
			img4 = Image.open(f'./_assets/none.png').convert('RGBA')

		if item["Crown"] != "None":
			img5 = Image.open(f'./_assets/cr/{cr_files[item["Crown"]]}.png').convert('RGBA')
		else:
			img5 = Image.open(f'./_assets/none.png').convert('RGBA')

		if item["Footwear"] != "None":
			img6 = Image.open(f'./_assets/fw/{fw_files[item["Footwear"]]}.png').convert('RGBA')
		else:
			img6 = Image.open(f'./_assets/none.png').convert('RGBA')

		if item["Accessories"] != "None":
			img7 = Image.open(f'./_assets/ac/{ac_files[item["Accessories"]]}.png').convert('RGBA')
		else:
			img7 = Image.open(f'./_assets/none.png').convert('RGBA')

		# Mash images
		com1 = Image.alpha_composite(img1, img2)
		com2 = Image.alpha_composite(com1, img3)
		com3 = Image.alpha_composite(com2, img4)
		com4 = Image.alpha_composite(com3, img5)
		com5 = Image.alpha_composite(com4, img6)
		com6 = Image.alpha_composite(com5, img7)

		# Convert to RGB
		result = com6.convert('RGB')

		# Save file
		filename = str('{:0>4}'.format(item["ImageNumber"])) + ".jpg"
		result.save("./_output/images/" + filename)
		print(f'{str(i)} done')

	i = i + 1
