# Pineapples Generation

How to generate pineapple images:

## Installation

Before being able to run this program, you'll need a few programs:

- Python 3: You can download and install python 3 [here][1].
- Libjpeg: This dependency is necessary for Pillow to function, you can install it with the following command in the command line.

```
brew install libjpeg
```

- Zlib: This other dependency is necessary for Pillow to run properly, you can find it [here][2].
- Pillow: You can follow [this tutorial][4] to install the Pillow library.

[1]: https://www.python.org/downloads/ "Python download page"
[2]: https://www.zlib.net/ "Zlib website"
[4]: https://pillow.readthedocs.io/en/stable/installation.html#basic-installation "Commands to install the Pillow library"

## Directory Structure

The script is programmed to function with the following directory structure:

```
- _assets
	- ac
	- bg
	- cr
	- ey
	- fw
	- mo
	- sk
- _output
```

## Filename conventions

The files should be name respecting the following conventions:

`ac1.png`, `ac2.png`, etc...

Those files should be placed in their respective directories.
In addition, an empty transparent image named `none.png` should be placed in `_assets`

## Usage

To run the script, simply type the following in the command line.
```
python3 generate.py <number>
```

By default, the script will produce 50 images, to produce more, type the number of desired images instead of `<number>`

## Output

The script will produce a number of images named `0.jpg`, `1.jpg`, etc... in the `_assets/output` directory.
It will also produce a file named `metadata.json` in the directory `_assets` containing a summary of all produced images.
