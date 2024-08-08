# Donate Manager

## Description

"Donate Manager" is a small project designed for charity organizations in Egypt to help manage donations, donors, and employees efficiently.

### Live Preview

Check out the live preview [here](https://drive.google.com/file/d/1FrkdWnMb4e1Pxr08sI7HkSBaYy2iUoZc/view?usp=drive_link).

## Features

- **Fast and Easy to Use**: Intuitive interface for quick navigation and management.
- **Multi-language and Localization**: Supports multiple languages to cater to diverse users.
- **Light and Dark Theme**: Switch between light and dark modes based on user preference.
- **Easy to Set Up and Upgrade**: Simple installation process and seamless upgrades.
- **Fully Separated API and Interface**: Distinct backend and frontend for better scalability and maintainability.

## API Development Languages and Tools

- Node.js
- TypeScript
- Mongoose
- MongoDB
- Express

## UI Development Languages and Tools

- Node.js
- React.js
- TypeScript
- Ant Design UI Framework
- React Icons
- Axios
- Tailwind CSS

## Requirements

- Node.js
- npm package manager
- MongoDB

## Installation

### 1. Setup API Production Code

1. **Open the Server directory**:
    ```shell
    cd Server
    ```
2. **Open the install directory**:
    ```shell
    cd install
    ```
3. **Run the install script**:
    ```shell
    node install.js
    ```

### 2. Configure Nginx Server for API

1. After installation is done, copy the `dist` folder from the server directory to the server root.
2. Copy `server.conf` from the Nginx config folder.
3. Open `server.conf` and edit it as needed.
4. Restart the Nginx server.
5. Open the server URL and test the API. You should get the following response:
    ```json
    {
        "error": true,
        "name": "",
        "message": "/ Not Found",
        "status": 404
    }
    ```

### 3. Setup Frontend

1. **Open the UI directory**:
    ```shell
    cd UI
    ```
2. **Run the install script**:
    ```shell
    node install.js
    ```

### 4. Configure Nginx Server for UI

1. After UI installation is complete, copy the `build` directory from the UI folder.
2. Copy `UI.conf` from the `nginx configs` folder.
3. Edit `UI.conf` as needed.
4. Default credentials:
    - Username: `admin`
    - Password: `92215098`
5. Open the URL and log in using the default credentials.

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch:
    ```shell
    git checkout -b feature-branch
    ```
3. Make your changes.
4. Commit your changes:
    ```shell
    git commit -m "Add new feature"
    ```
5. Push to the branch:
    ```shell
    git push origin feature-branch
    ```
6. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

If you have any issues or questions about this project, please contact me.
