const signUplayout = (variables = {}) => {
    return `<!DOCTYPE html>
    <html>
    
    <body>
    
        <h2>HTML Forms</h2>
    
        <form action="/action_page.php">
            <label for="fname">First name:</label><br>
            <input type="text" id="fname" name="fname" value="${variables.v1 || ''}"><br>
            <label for="lname">Last name:</label><br>
            <input type="text" id="lname" name="lname" value="${variables.v2 || ''}"><br><br>
            <input type="submit" value="Submit">
        </form>
    
        <p>If you click the "Submit" button, the form-data will be sent to a page called "/action_page.php".</p>
    
    </body>
    
    </html>`
}

module.exports = { signUplayout }