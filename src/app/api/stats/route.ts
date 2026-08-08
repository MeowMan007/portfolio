import { NextResponse } from "next/server";

export const revalidate = 3600; // Cache the response for 1 hour

export async function GET() {
  const stats = {
    github: {
      stars: 12,
      repos: 10,
      followers: 8,
      languages: [
        { name: "Python", percentage: 45 },
        { name: "TypeScript", percentage: 30 },
        { name: "JavaScript", percentage: 15 },
        { name: "C++", percentage: 10 },
      ],
    },
    dsa: {
      solved: 400,
      rating: 1650,
      certifications: 14,
    },
  };

  // Fetch real GitHub Stats for MeowMan007
  try {
    const userRes = await fetch("https://api.github.com/users/MeowMan007", {
      next: { revalidate: 3600 },
      headers: {
        "User-Agent": "Portfolio-API",
      },
    });
    if (userRes.ok) {
      const userData = await userRes.json();
      stats.github.repos = userData.public_repos || stats.github.repos;
      stats.github.followers = userData.followers || stats.github.followers;
    }

    const reposRes = await fetch("https://api.github.com/users/MeowMan007/repos?per_page=100", {
      next: { revalidate: 3600 },
      headers: {
        "User-Agent": "Portfolio-API",
      },
    });
    if (reposRes.ok) {
      const reposData = await reposRes.json();
      const totalStars = reposData.reduce((acc: number, repo: any) => acc + (repo.stargazers_count || 0), 0);
      stats.github.stars = totalStars || stats.github.stars;

      const languagesMap: { [key: string]: number } = {};
      let totalReposWithLanguage = 0;
      reposData.forEach((repo: any) => {
        if (repo.language) {
          languagesMap[repo.language] = (languagesMap[repo.language] || 0) + 1;
          totalReposWithLanguage++;
        }
      });

      const sortedLangs = Object.entries(languagesMap)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 4);

      const languagesList = sortedLangs.map(([name, count]) => ({
        name,
        percentage: totalReposWithLanguage > 0 ? Math.round((count / totalReposWithLanguage) * 100) : 0,
      }));

      if (languagesList.length > 0) {
        stats.github.languages = languagesList;
      }
    }
  } catch (err) {
    console.error("Error fetching GitHub stats in API route:", err);
  }

  return NextResponse.json(stats);
}
