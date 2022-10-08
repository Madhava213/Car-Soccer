/* Assignment 2: Car Soccer
 * CSCI 4611, Fall 2022, University of Minnesota
 * Instructor: Evan Suma Rosenberg <suma@umn.edu>
 * License: Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
 */ 

// You do not need to change existing code in this class.  However, you may need to 
// add additional code that extends this class to complete the assignment.
// You are also free to modify the existing code if you want.

import * as gfx from 'gophergfx'

export class Car extends gfx.BoxMesh
{
    public forwardSpeed: number;
    public rotationSpeed: number;

    public velocity: gfx.Vector3;
    public startPosition: gfx.Vector3;
    public size: gfx.Vector3;

    constructor(width = 1, height = 1, depth = 1)
    {
        // Call the base class constructor
        super(width, height, depth);

        // Initialize member variables
        this.forwardSpeed = 0;
        this.rotationSpeed = 0;
        this.velocity = new gfx.Vector3();
        this.startPosition = new gfx.Vector3(0, height/2, 0);
        this.size = new gfx.Vector3(width, height, depth);

        // Set the material color
        const carMaterial = new gfx.GouraudMaterial();
        carMaterial.ambientColor.set(0.8, 0.2, 0.2);
        carMaterial.diffuseColor.set(0.8, 0.2, 0.2);
        this.material = carMaterial;

        // Add smaller, lighter colored box that at the front
        const frontMaterial = new gfx.GouraudMaterial();
        frontMaterial.ambientColor.set(0.8, 0.5, 0.5);
        frontMaterial.diffuseColor.set(0.8, 0.5, 0.5);

        const carFront = new gfx.BoxMesh(width, 0.01, depth / 4);
        carFront.material = frontMaterial;
        carFront.position.y = height / 2 + 0.01;
        carFront.position.z = -depth / 2 + depth / 8;
        this.add(carFront);
    }

    update(deltaTime: number): void
    {
        // Update the car's velocity (in world coordinates)
        // this.velocity.set(0, 0, this.forwardSpeed);
        this.rotateY(this.rotationSpeed * deltaTime);
        this.translateX(this.rotationSpeed * deltaTime);
        this.translateZ(this.forwardSpeed * deltaTime);

        // // Update the car position based on the velocity
        // const translation = gfx.Vector3.multiplyScalar(this.velocity, deltaTime)
        // this.position.add(translation);
    }

    reset()
    {
        this.position.copy(this.startPosition);
        this.velocity.set(0, 0, 0);
        this.forwardSpeed = 0;
        this.rotationSpeed = 0;
        this.rotation = new gfx.Quaternion();
    }
}