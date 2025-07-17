# YouTube Dynamic View Counter

A Node.js application that automatically updates a YouTube video's title to display the current view count in real-time.

## 🎯 Project Overview

This project creates a dynamic YouTube video title that automatically updates to show how many times the video has been viewed. The application continuously monitors the view count and updates the title with the format: "Bu video [VIEW_COUNT] kez izlendi" (This video has been watched [VIEW_COUNT] times).

## ✨ Features

- **Real-time Updates**: Automatically updates video title with current view count
- **Smart Sync**: Only updates when view count changes to avoid unnecessary API calls
- **OAuth Authentication**: Secure authentication using Google OAuth 2.0
- **Token Management**: Automatic token refresh and storage
- **Configurable Interval**: Customizable sync frequency
- **Error Handling**: Robust error handling with automatic retry mechanism

## 📋 Prerequisites

- Node.js (v12 or higher)
- YouTube Data API v3 access
- Google Cloud Console project with YouTube Data API enabled

## 🛠️ Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd youtube-view-counter
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up Google Cloud Console**

   - Create a new project in [Google Cloud Console](https://console.cloud.google.com/)
   - Enable YouTube Data API v3
   - Create OAuth 2.0 credentials
   - Download the credentials JSON file

4. **Configure credentials**

   - Use the provided template file to create your credentials:
     ```bash
     cp credentials.template.json credentials.json
     ```
   - Edit `credentials.json` with your Google OAuth 2.0 credentials from Google Cloud Console
   - Fill in the required fields (see Template Files section for details)

5. **Configure the application**
   - Edit `configs.json` to set your video ID and sync interval
   ```json
   {
     "VIDEO_ID": "your-video-id-here",
     "PACE": 30000
   }
   ```

## ⚙️ Configuration

### `configs.json`

- **VIDEO_ID**: The YouTube video ID you want to monitor
- **PACE**: Sync interval in milliseconds (default: 30000 = 30 seconds)

### Template Files

The project includes template files to help you set up the required configuration:

#### `credentials.template.json`

This template shows the structure of the Google OAuth 2.0 credentials file. Copy this file to `credentials.json` and fill in your actual values:

- **client_id**: Your OAuth 2.0 client ID from Google Cloud Console
- **client_secret**: Your OAuth 2.0 client secret from Google Cloud Console
- **redirect_uris**: OAuth redirect URIs (default: `["urn:ietf:wg:oauth:2.0:oob"]`)

#### `tokens.template.json`

This template shows the structure of the OAuth tokens file. This file is auto-generated during the first authentication, but the template shows what fields will be stored:

- **access_token**: OAuth access token for API calls
- **refresh_token**: Token used to refresh expired access tokens
- **scope**: API scope permissions
- **token_type**: Always "Bearer"
- **expiry_date**: Token expiration timestamp

### Required Files

- `credentials.json`: Google OAuth 2.0 credentials (created from template)
- `tokens.json`: Auto-generated OAuth tokens (created after first authentication)

## 🚀 Usage

1. **Start the application**

   ```bash
   node counter.js
   ```

2. **First-time authentication**

   - The application will generate an OAuth URL
   - Open the URL in your browser
   - Grant permissions to your YouTube account
   - Copy the authorization code
   - Paste it into the terminal when prompted

3. **Automatic operation**
   - The application will start monitoring your video
   - View count updates will be applied automatically
   - The process will continue running until stopped

## 📁 Project Structure

```
youtube-view-counter/
├── auth.js                    # OAuth authentication and token management
├── counter.js                 # Main application logic and sync functionality
├── configs.json               # Configuration settings
├── credentials.json           # Google OAuth credentials (create from template)
├── credentials.template.json  # Template for OAuth credentials
├── tokens.json                # OAuth tokens (auto-generated)
├── tokens.template.json       # Template showing token structure
├── package.json               # Project dependencies
└── README.md                  # This file
```

## 🔧 Technical Details

### Dependencies

- **googleapis**: Google APIs Node.js client
- **google-auth-library**: Google authentication library
- **axios**: HTTP client for API requests

### API Endpoints Used

- `youtube.videos.list`: Retrieve video statistics and metadata
- `youtube.videos.update`: Update video title with new view count

### Authentication Flow

1. Generate OAuth 2.0 authorization URL
2. User grants permissions
3. Exchange authorization code for access token
4. Store tokens for future use
5. Automatic token refresh when needed

## 🔒 Security Considerations

- Keep `credentials.json` secure and never commit it to version control
- `tokens.json` contains sensitive access tokens - handle with care
- Use the provided template files (`credentials.template.json` and `tokens.template.json`) for reference
- Add `credentials.json` and `tokens.json` to your `.gitignore` file
- Use environment variables for production deployments
- Ensure proper OAuth scopes (YouTube Data API access only)

## 📊 Monitoring

The application provides console output for:

- Sync operations
- View count changes
- Authentication status
- Error messages

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the ISC License.

## ⚠️ Important Notes

- YouTube API has usage quotas - monitor your usage
- Frequent title updates may affect video SEO
- Ensure compliance with YouTube's Terms of Service
- Test with a non-public video first

## 🐛 Troubleshooting

### Common Issues

1. **Authentication Error**: Check credentials.json format and permissions
2. **API Quota Exceeded**: Increase PACE value or wait for quota reset
3. **Video Not Found**: Verify VIDEO_ID in configs.json
4. **Token Expired**: Delete tokens.json and re-authenticate

### Support

For issues and questions, please create an issue in the repository.
