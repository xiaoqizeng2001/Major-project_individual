# Major-project_individual
## Instructions for Interaction
1. Mouse click on dove to change position
When the mouse clicks on the dove, the dove will randomly change its position
2. Automatic animation effect
After the page loads, the mountains, boats, and flocks of birds will automatically begin to animate.

Perlin noise is used to achieve the natural and smooth movement of boats and birds. The animation contains a persistent grainy effect of old movies, adding a sense of nostalgia.
## Details of individual approach to animating the group code
I mainly use Perlin noise to drive my animation code to achieve smooth and natural animation effects
### Here are the 4 properties of the image will be animated:
1. Dove movement
When the mouse clicks on the dove, the dove will randomly and smoothly move to the next position (using the lerp function) allowing the user to interact with the scene, adding interest
2. Boat movement
The position of the boat on the water surface is determined by Perlin noise, which simulates the effect of the boat moving slowly, helping the boat's movement look more realistic and natural.
3. Bird flock movement
The movement of the bird flock is similarly driven by Perlin noise, making their flight paths dynamic and realistic.
4. Mountain animation
Simulate the feeling of being in flight with the birds
## Inspiration and References
I was inspired by a youtube animated clip. The video turns a series of Chinese landscape paintings into a lifelike animation, with mountains and rivers moving slowly, changing different backgrounds, gurgling water, birds flying freely, and the sound of Chinese Musical Instruments playing in the background, which is very healing and soothing. Therefore, in my works, I also show the feeling of the boat drifting slowly along the river, the mountains in the background are constantly changing, and the birds are flying freely

[The YouTube link for inspiration](https://www.youtube.com/watch?v=iej1t2FliEw)
![Inspiration images](readmeImages/1.png)

## Technical explanation
1. Dove movement: The lerp function updates the dove's location by utilizing the difference between its present position and the target position that is selected by a mouse click. This technique gives the transition a natural appearance and produces a smooth moving effect.
2. Boats, mountain and flocks of birds move: The movement of all is driven by Perlin noise. The noise function generates smooth pseudo-random values, creating a natural path of motion.
The horizontal and vertical position of the boat is updated by adding noise offset, making it move gently on the water. Similarly, the position of the flock is updated so that they fly dynamically on the screen. Mountains are drawn using multiple layers of Perlin noise, mimicking the natural mountain layer effect. The height and color of each mountain layer is generated by Perlin noise, which slowly changes over time to create a dynamic natural landscape effect.

## Changes to the group code
1. Perlin noise was introduced to drive the movement of boats and birds, enhancing the realism of the scene.
2. Add interactive movement of dove, allowing users to change the position of dove by clicking on the canvas.
3. Add dynamic changes of mountains to make the background more vivid.
