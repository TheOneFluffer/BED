const { headers, method, url } = req;
    let body = [];
    
    req.on('error', (err) => {
      console.error(err);
    }).on('data', (chunk) => {
      body.push(chunk);
    }).on('end', () => {
      body = Buffer.concat(body).toString();
        
      console.log(body.length);
      // At this point, we have the headers, method, url and body, and can now
      // do whatever we need to in order to respond to this request.

    });
