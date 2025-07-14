import { getProjects, getTeamMembers } from '@/utils/sanity-data';

export default async function CMSTestPage() {
  try {
    // Test fetching data from Sanity
    const projects = await getProjects();
    const teamMembers = await getTeamMembers();

    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Sanity CMS Connection Test</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Projects Section */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Projects ({projects?.length || 0})</h2>
            {projects && projects.length > 0 ? (
              <ul className="space-y-2">
                {projects.map((project: any) => (
                  <li key={project._id} className="border-b pb-2">
                    <h3 className="font-medium">{project.name}</h3>
                    <p className="text-base text-gray-600">{project.location}</p>
                    <p className="text-base text-gray-600">Status: {project.status}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">No projects found. Add some in Sanity Studio!</p>
            )}
          </div>

          {/* Team Members Section */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Team Members ({teamMembers?.length || 0})</h2>
            {teamMembers && teamMembers.length > 0 ? (
              <ul className="space-y-2">
                {teamMembers.map((member: any) => (
                  <li key={member._id} className="border-b pb-2">
                    <h3 className="font-medium">{member.name}</h3>
                    <p className="text-base text-gray-600">{member.role}</p>
                    <p className="text-base text-gray-600">{member.expertise}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">No team members found. Add some in Sanity Studio!</p>
            )}
          </div>
        </div>

        <div className="mt-8 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          <strong>✅ Success!</strong> Sanity CMS connection is working. 
          You can now add content through the Sanity Studio and it will appear here.
        </div>

        <div className="mt-4 text-base text-gray-600">
          <p>• Sanity Studio should be running at: <a href="http://localhost:3333" className="text-blue-600 hover:underline">http://localhost:3333</a></p>
          <p>• Add projects and team members in the Studio to see them appear here</p>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching data from Sanity:', error);
    
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Sanity CMS Connection Test</h1>
        
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <strong>❌ Error!</strong> Failed to connect to Sanity CMS.
          <p className="mt-2">Error details: {error instanceof Error ? error.message : 'Unknown error'}</p>
        </div>

        <div className="mt-4 text-base text-gray-600">
          <p>Please check:</p>
          <ul className="list-disc list-inside mt-2">
            <li>Your API token is correct in .env.local</li>
            <li>Sanity Studio is running (cd studio && npm run dev)</li>
            <li>Your project ID and dataset are correct</li>
          </ul>
        </div>
      </div>
    );
  }
} 