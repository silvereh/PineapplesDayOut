from PIL import Image, ImageOps
import sys
import random
import json

# ALINA
img1 = Image.open(f'./_assets/bg/bg9.png').convert('RGBA')
img2 = Image.open(f'./_assets/sk/sk13.png').convert('RGBA')
img3 = Image.open(f'./_assets/mo/mo15.png').convert('RGBA')
img4 = Image.open(f'./_assets/ey/ey16.png').convert('RGBA')
img5 = Image.open(f'./_assets/cr/cr12.png').convert('RGBA')
img6 = Image.open(f'./_assets/fw/fw8.png').convert('RGBA')
img7 = Image.open(f'./_assets/ac/ac4.png').convert('RGBA')

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
filename = "alina.jpg"
result.save("./_output/images/" + filename, quality=95)

# VANDEMLAU

img1 = Image.open(f'./_assets/bg/bg1.png').convert('RGBA')
img2 = Image.open(f'./_assets/sk/sk15.png').convert('RGBA')
img3 = Image.open(f'./_assets/mo/mo3.png').convert('RGBA')
img4 = Image.open(f'./_assets/ey/ey15.png').convert('RGBA')
img5 = Image.open(f'./_assets/cr/cr11.png').convert('RGBA')

# Mash images
com1 = Image.alpha_composite(img1, img2)
com2 = Image.alpha_composite(com1, img3)
com3 = Image.alpha_composite(com2, img4)
com4 = Image.alpha_composite(com3, img5)

# Convert to RGB
result = com4.convert('RGB')

# Save file
filename = "vandemlau.jpg"
result.save("./_output/images/" + filename, quality=95)

# PINEAPPLE HEAD

img1 = Image.open(f'./_assets/bg/bg6.png').convert('RGBA')
img2 = Image.open(f'./_assets/sk/sk10.png').convert('RGBA')
img3 = Image.open(f'./_assets/mo/mo1.png').convert('RGBA')
img4 = Image.open(f'./_assets/ey/ey1.png').convert('RGBA')
img5 = Image.open(f'./_assets/cr/cr12.png').convert('RGBA')
img6 = Image.open(f'./_assets/fw/fw2.png').convert('RGBA')
img7 = Image.open(f'./_assets/ac/ac7.png').convert('RGBA')

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
filename = "pineapplehead.jpg"
result.save("./_output/images/" + filename, quality=95)

