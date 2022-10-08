/* Assignment 2: Car Soccer
 * CSCI 4611, Fall 2022, University of Minnesota
 * Instructor: Evan Suma Rosenberg <suma@umn.edu>
 * License: Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
 */ 

// You do not need to change existing code in this class.  However, you may need to 
// add additional code that extends this class to complete the assignment.
// You are also free to modify the existing code if you want.

import * as gfx from 'gophergfx'

export class Ball extends gfx.SphereMesh
{
    public velocity: gfx.Vector3;
    private shadow: gfx.SphereMesh;

    constructor(radius = 1, subdivisions=3)
    {
        // Call the base class constructor
        super(radius, subdivisions);

        // Initialize member variables
        this.velocity = new gfx.Vector3();

        // Set the material color
        const ballMaterial = new gfx.GouraudMaterial();
        ballMaterial.ambientColor.set(0.335, 0.775, 0.891);
        ballMaterial.diffuseColor.set(0.335, 0.775, 0.891);
        ballMaterial.specularColor.set(0.3, 0.3, 0.3);
        ballMaterial.shininess = 10;
        this.material = ballMaterial;

        // Create a shadow that will follow under the ball
        this.shadow = new gfx.SphereMesh(radius, subdivisions);
        this.shadow.position.y = -this.position.y + 0.005;
        this.shadow.scale.y = 0.01;
        this.add(this.shadow);

        // Set the shadow to be semi-transparent
        const shadowMaterial = new gfx.UnlitMaterial();
        shadowMaterial.color.set(0, 0, 0, 0.5);
        this.shadow.material = shadowMaterial;
    }

    update(deltaTime: number): void
    {
        // p' = p + v * dt
        this.position.x += this.velocity.x * deltaTime;
        this.position.y += this.velocity.y * deltaTime;
        this.position.z += this.velocity.z * deltaTime;

        // Update the shadow position so that it is always on the ground
        // directly underneath the ball.
        this.shadow.position.y = -this.position.y + 0.005;
    }

    reset()
    {
       // Set the initial position so the bottom edge is a meter above the ground
       this.position.set(0, this.radius/2 + 1, 0);
        this.velocity.set(0, 0, 0);
       this.shadow.position.y = -this.position.y + 0.005;
    }
}