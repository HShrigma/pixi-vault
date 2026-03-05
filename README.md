# Pixi Vault

Pixi Vault is a vault-opening mini-game built with Pixi.js and GSAP, where players try to unlock a vault by following a secret combination of rotational commands. Successfully completing the combination opens the vault to reveal a treasure, while incorrect input triggers a spinning handle and resets the game.

## Install & Run Instructions

1. **Installation**: 
``` bash
git clone <repo_url>
cd ./project 
npm install
```
2. **Run development build**: 
```bash 
npm run start 
# Once started: o + Enter
# Or open in browser: http://localhost:3000/
``` 
3. **Production build**:
```bash
npm run build 
npm run preview 
# Once started: o + Enter
# Local:   http://localhost:8080/
# Network: http://192.168.0.9:8080/
```
### How to Play

- Click **Clockwise** or **Counterclockwise** to rotate the handle.
- Complete the sequence of 3 commands to open the vault.
- Incorrect input triggers a handle spin-out and resets the game.
- After winning, game restarts automatically.

## Gameplay

Each game has a secret combination (logged in the browser console) of three random alternating commands *(number of turns + direction)*.
Use **Clockwise** and **Counterclockwise** buttons to rotate the handle according to the combination.
Complete all commands correctly to open the vault, revealing the treasure.
Incorrect input triggers a spin-out animation and resets the game after a short delay.
After winning, the game automatically restarts in five seconds.

## Key Features

- **Decoupled Design**: 
    - Prefabs handle their own visuals.
    - State Managers and helpers handle game logic.
    - Event-driven communication between modules.
    - Focus on reusable code and inversion of control (IoC).
- **Object-Oriented Approach**: 
    - Distinct classes with proper encapsulation.
    - Buttons with inheritance.
    - Composition was used over inheritance where possible.
- **VFX & Audio**: 
    - Shine effects, twinkling animations, progress clicks, and victory/lose jingles.
- **Dynamic Counter**:
    - Tracks elapsed time, switches to blinking *WIN/LOSE* messages on game finished.
- **Responsive Design**: 
    - Background is resized by cropping until  major gameplay elements (vault, counter) may be covered; after that, scales preserving aspect ratio
    - Background-dependent visuals (vault, handle) are added as children to background.
    - Buttons handle their own resize logic as sticky UI elements.

## Architecture

- **GameManager**: Controls overall game state and coordinates major events.
- **VaultStateManager**: Tracks vault state (open/closed) and communicates with the vault view.
- **VaultDoorProcessor**: Handles business logic for VaultStateManager. Validates input directions and updates combination progress.
- **Combination**: Helper logic for resolving input to command parsing.
- **VFXManager**: Manages shine animations and counter.
- **Handle**: Animates rotations, pulses, and spin-outs with **GSAP**.
- **Buttons**: Appear when the game starts, disappear on win/loss.