
export const CANVAS_HEIGHT = 1000;
export const CANVAS_WIDTH = 1000;
export const canvas = document.createElement('canvas');
export const context = canvas.getContext('2d') || new CanvasRenderingContext2D();
export const LAMP_WIDTH = 30;
export const LAMP_HEIGHT = 30;
export const OBSTACLES = [];
export const MAX_OBSTACLES = 50;
export const MIN_OBSTACLES = 30;
export const MAX_OBSTACLE_SIZE = 30;
export const MIN_OBSTACLE_SIZE = 10;