import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../lib/mongodb';
import Job from '../../../models/Job';

// GET - Fetch all jobs (no filters as requested)
export async function GET() {
  try {
    await dbConnect();
    
    const jobs = await Job.find({}).sort({ createdAt: -1 });
    
    return NextResponse.json({
      success: true,
      data: jobs,
      count: jobs.length,
    });
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch jobs',
      },
      { status: 500 }
    );
  }
}

// POST - Create a new job
export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const body = await request.json();
    
    // Validate required fields
    const { CompanyName, Jobtitle, experience, location, salary, salaryValue, JobDescription, JobType, ApplicationDate, Experience, Jobicon } = body;
    
    if (!CompanyName || !Jobtitle || !experience || !location || !salary || !salaryValue || !JobDescription || !Jobicon) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields',
        },
        { status: 400 }
      );
    }
    
    // Create new job
    const newJob = new Job({
      CompanyName,
      Jobtitle,
      experience: experience || '1-3 years',
      location,
      salary,
      salaryValue,
      JobDescription,
      JobType: JobType || 'fulltime',
      ApplicationDate,
      postedTime: body.postedTime || '24h Ago',
      Experience: Experience || '1-3 years',
      Jobicon,
    });
    
    const savedJob = await newJob.save();
    
    return NextResponse.json({
      success: true,
      data: savedJob,
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating job:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create job',
      },
      { status: 500 }
    );
  }
}

// DELETE - Delete a job by ID
export async function DELETE(request: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: 'Job ID is required',
        },
        { status: 400 }
      );
    }
    
    const deletedJob = await Job.findByIdAndDelete(id);
    
    if (!deletedJob) {
      return NextResponse.json(
        {
          success: false,
          error: 'Job not found',
        },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Job deleted successfully',
      data: deletedJob,
    });
  } catch (error) {
    console.error('Error deleting job:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to delete job',
      },
      { status: 500 }
    );
  }
}