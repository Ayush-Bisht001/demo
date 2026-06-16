# Render Deployment Checklist

## Render settings

- Root Directory: `backend`
- Build Command: `npm install`
- Start Command: `npm start`

## Required backend environment variables

- `NODE_ENV=production`
- `FRONTEND_URL=https://your-vercel-frontend.vercel.app`
- `MONGO_URI=your_mongodb_atlas_uri_with_encoded_password`
- `JWT_SECRET=your_strong_jwt_secret`
- `JWT_EXPIRES_IN=7d`
- `OTP_EXPIRES_IN_MINUTES=10`
- `CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name`
- `CLOUDINARY_API_KEY=your_cloudinary_api_key`
- `CLOUDINARY_API_SECRET=your_cloudinary_api_secret`

## Optional SMTP environment variables

- `SMTP_HOST=smtp.gmail.com`
- `SMTP_PORT=587`
- `SMTP_USER=your_email@gmail.com`
- `SMTP_PASS=your_16_digit_gmail_app_password_without_spaces`
- `SMTP_FROM=Auth App <your_email@gmail.com>`

If SMTP variables are missing, the backend logs a warning and still starts. API flows that send OTP email should return `503` with a clean message instead of crashing the server.

## MongoDB password encoding

If the MongoDB password contains special characters like `@ # $ % : / ? & =`, encode the password before putting it in `MONGO_URI`.

Example:

- Original password: `my@pass#123`
- Encoded password: `my%40pass%23123`
- Correct URI: `mongodb+srv://username:my%40pass%23123@cluster.mongodb.net/dbname?retryWrites=true&w=majority`

## Why SMTP should not crash Render

Render checks whether the web service starts and responds. Email is needed only for OTP email flows, so startup should require MongoDB but treat SMTP as optional. Missing or incorrect SMTP settings now produce warnings during configuration and controlled `503` API errors when an email send is attempted.

## Final testing steps

1. Deploy the backend on Render with required variables only.
2. Open `https://your-render-service.onrender.com/api/health`.
3. Confirm the response includes `"success": true` and `"emailService": "not_configured"`.
4. Add valid SMTP variables in Render.
5. Redeploy and check `/api/health` again.
6. Confirm the response includes `"emailService": "configured"`.
7. Test register/login OTP flows after auth routes are connected to `sendEmail`.
