FROM node:8.9

# Set the working directory to /cloud-monitor
WORKDIR /cloud-monitor

# Copy the current directory contents into the container at /cloud-monitor
ADD . /cloud-monitor

# Set an entrypoint, to automatically install node modules
ENTRYPOINT ["/bin/bash", "-c", "if [[ ! -d node_modules ]]; then npm install --registry https://registry.npm.taobao.org; fi; exec \"${@:0}\";"]

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Run app.py when the container launches
CMD ["npm", "run", "dev"]
