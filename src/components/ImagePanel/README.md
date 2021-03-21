# ImagePanel Component

ImagePanel displays the images stored in the generated images stored in Redux using the `<GridListTile />` and `<GridListTileBar />` components from Material UI. The user can click on leftward pointing arrow to load that image into the UI. They can also click on the downward pointing arrow to download the selected image on their machine. The user can also click on the trash can to delete that image from the image panel.

The ImagePanel component does this in the `.map()` higher order function. which then renders each image. The `<img />` tag pulls the base64 string of the image and displays it to the user, which is stored in `tile.img`. 

To notify the user which image is which and to keep the UI clear, the `tile.genType` stores the type of image. For example: Blob, BundleOfTubes, LocalThickness, and so on.
