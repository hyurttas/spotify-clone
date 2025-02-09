import { UAParser } from "ua-parser-js";
import { headers } from "next/headers";

export async function getDeviceName() {
    try {
        const headersList = await headers();
        const userAgent = headersList.get('user-agent') || '';
        const platform = headersList.get('sec-ch-ua-platform')?.replace(/"/g, '') || '';

        // First try UA Parser
        const parser = new UAParser(userAgent);
        const result = parser.getResult();

        // Additional iOS detection from user agent
        if (userAgent.includes('iPhone') || userAgent.includes('iPad') || userAgent.includes('iPod')) {
            return 'iOS';
        }

        if (result.os.name) {
            // Map common OS names to consistent values
            const osMap: Record<string, string> = {
                'Mac OS': 'macOS',
                'Mac OS X': 'macOS',
                'iOS': 'iOS',
                'iPhone': 'iOS',
                'iPad': 'iOS'
            };
            return osMap[result.os.name] || result.os.name;
        }

        // Try platform header
        if (platform) {
            const platformMap: Record<string, string> = {
                'macOS': 'macOS',
                'iOS': 'iOS',
                'Windows': 'Windows',
                'Android': 'Android',
                'Linux': 'Linux',
                'Chrome OS': 'Chrome OS'
            };
            return platformMap[platform] || platform;
        }

        // Additional iOS detection from platform
        if (platform.includes('iPhone') || platform.includes('iPad') || platform.includes('iPod')) {
            return 'iOS';
        }

        return 'unknown';
    } catch (error) {
        console.error('Error getting device name:', error);
        return 'unknown';
    }
}