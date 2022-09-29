/* Assignment 2: Car Soccer
 * CSCI 4611, Fall 2022, University of Minnesota
 * Instructor: Evan Suma Rosenberg <suma@umn.edu>
 * License: Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
 */ 

import * as gfx from 'gophergfx'
import { Ball } from './Ball';
import { Car } from './Car';

export class CarSoccer extends gfx.GfxApp
{
    private car: Car;
    private ball: Ball;
    private inputVector: gfx.Vector2;

    constructor()
    {
        // Call the base class constructor
        super();

        // Initialize member variables
        this.car = new Car(4.5, 4.5, 5.5);
        this.ball = new Ball(2.6);
        this.inputVector = new gfx.Vector2();
    }

    createScene(): void 
    {
        // Setup the camera projection matrix, position, and look direction.
        // We will learn more about camera models later in this course.
        this.camera.setPerspectiveCamera(60, 2, 0.1, 500)
        this.camera.position.set(0, 63, 73);
        this.camera.lookAt(gfx.Vector3.ZERO);

        // Create an ambient light
        const ambientLight = new gfx.AmbientLight(new gfx.Color(0.3, 0.3, 0.3));
        this.scene.add(ambientLight);

        // Create a directional light
        const directionalLight = new gfx.DirectionalLight(new gfx.Color(0.6, 0.6, 0.6));
        directionalLight.position.set(0, 2, 1);
        this.scene.add(directionalLight);

        // Set the background image
        const background = new gfx.Rectangle(2, 2);
        background.material.texture = new gfx.Texture('./assets/crowd.png');
        background.layer = 1;
        this.scene.add(background);

        // Create a mesh for the field
        const field = new gfx.BoxMesh(100, 1, 120);
        field.position.set(0, -0.51, 0);
        this.scene.add(field);

        // Set the field material
        const fieldMaterial = new gfx.GouraudMaterial();
        fieldMaterial.ambientColor.set(16/255, 46/255, 9/255);
        fieldMaterial.diffuseColor.copy(fieldMaterial.ambientColor);
        field.material = fieldMaterial;

        // Create a mesh for the pitch
        const pitch = new gfx.BoxMesh(80, 1, 100);
        pitch.position.set(0, -0.5, 0);
        this.scene.add(pitch);

        // Set the pitch material
        const pitchMaterial = new gfx.GouraudMaterial();
        pitchMaterial.texture = new gfx.Texture('./assets/pitch.png');
        pitch.material = pitchMaterial;
        
        // Add the car to the scene
        this.car.startPosition.z = 44;
        this.car.boundingSphere.radius = 2.25;
        this.car.reset();
        this.scene.add(this.car);

        // Add the ball to the scene
        this.ball.reset();
        this.scene.add(this.ball);


        // PART 1: 3D DRAWING
        // You should add code here to draw the 3D boundaries of the pitch
        // and a grid of boxes that form the "net" for each goal.


        // ADD PART 1 CODE HERE


    }

    update(deltaTime: number): void 
    {
        // Speed in meters/sec
        const carMaxSpeed = 80;
        const carAcceleration = 80;

        // The gravity constant should be continuously applied each frame
        const gravity = -20 * deltaTime;

        // The friction constant should be applied when the ball collides
        // with the ground, walls, or ceiling boundaries to slow it down
        let frictionSlowDown = 1 - deltaTime / 0.08;
        frictionSlowDown = gfx.MathUtils.clamp(frictionSlowDown,  0, 1);



        // Accelerate the car based on the user input vector
        if(this.inputVector.y != 0)
        {
            // The input vector controls the direction and the
            // speed is determined by the acceleration constant
            // multiplied by deltaTime
            this.car.forwardSpeed += carAcceleration * deltaTime * -this.inputVector.y;
            
            // The clamp() convenience function makes sure that
            // the speed never exceeds the min or max limit
            this.car.forwardSpeed = gfx.MathUtils.clamp(this.car.forwardSpeed, -carMaxSpeed, carMaxSpeed);
        }
        // If the user is not pressing forward or backward
        // then decelerate the car due to friction
        else
        {
            // If the car is moving forward, then the speed should decrease.
            if(this.car.forwardSpeed > 0)
            {
                this.car.forwardSpeed -= carAcceleration * deltaTime;

                // If the speed drops below a threshold, then stop it entirely
                if(this.car.forwardSpeed < 0.01)
                    this.car.forwardSpeed = 0;
            }
            // If the car is moving backwards, then the speed should increase.
            else if(this.car.forwardSpeed < 0) 
            {
                this.car.forwardSpeed += carAcceleration * deltaTime;

                // If the speed increases above a threshold, then stop it entirely
                if(this.car.forwardSpeed > -0.01)
                    this.car.forwardSpeed = 0;
            }
        }


        // PART 2: CAR DRIVING
        // You should add code here to implement car-like steering.  You will likely
        // also need to extend the movement code in the Car class to account for rotation.

        
        // ADD PART 2 CODE HERE


        // Update the car's velocity and position based on its forward speed
        this.car.update(deltaTime);



        // PART 3: BALL PHYSICS
        // This code defines the gravity and friction parameters used in the
        // instructor's example implementation.  You can feel free to change
        // them if you want to adjust your game mechanics and difficulty.
        // Note that these constants are already multiplied by deltaTime,
        // so they correspond to the movement in this frame only.


        // ADD PART 3 CODE HERE


        // After you change the ball's velocity, this method needs to be
        // called to compute its updated position.
        this.ball.update(deltaTime);



        // PART 4: BALL-GOAL INTERSECTIONS
        // If the ball enters a goal, then reset both the car and ball.
        // Note that a sphere is not a good representation of the rectangular
        // goal, so if you decide to use a built-in intersection test, you
        // should use axis-aligned bounding boxes and not bounding spheres.
        

        // ADD YOUR CODE HERE



        // PART 5: CAR-BALL COLLISIONS
        // This is the most challenging part of this assignment.  Make sure
        // to read all the information described in the README.  If you are
        // struggling with understanding the math or have questions about
        // how to implement the equations, then you should seek help from
        // the instructor or TA. 


        // ADD YOUR CODE HERE


    }

    // Set the x or y components of the input vector when either
    // the WASD or arrow keys are pressed.  If the space bar is
    // pressed, then reset the game.
    onKeyDown(event: KeyboardEvent): void 
    {
        if(event.key == 'w' || event.key == 'ArrowUp')
            this.inputVector.y = 1;
        else if(event.key == 's' || event.key == 'ArrowDown')
            this.inputVector.y = -1;
        else if(event.key == 'a' || event.key == 'ArrowLeft')
            this.inputVector.x = -1;
        else if(event.key == 'd' || event.key == 'ArrowRight')
            this.inputVector.x = 1;
        else if(event.key == ' ')
        {
            this.car.reset();
            this.ball.reset();
        }
    }

    // Reset the x or y components of the input vector when either
    // the WASD or arrow keys are released.
    onKeyUp(event: KeyboardEvent): void 
    {
        if((event.key == 'w' || event.key == 'ArrowUp') && this.inputVector.y == 1)
            this.inputVector.y = 0;
        else if((event.key == 's' || event.key == 'ArrowDown') && this.inputVector.y == -1)
            this.inputVector.y = 0;
        else if((event.key == 'a' || event.key == 'ArrowLeft')  && this.inputVector.x == -1)
            this.inputVector.x = 0;
        else if((event.key == 'd' || event.key == 'ArrowRight')  && this.inputVector.x == 1)
            this.inputVector.x = 0;
    }
}