import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'economicAnalysis',
  title: 'Economic Analysis',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      description: 'Brief overview of the economic analysis',
    }),
    defineField({
      name: 'lcoeComparison',
      title: 'LCOE Comparison',
      type: 'object',
      fields: [
        defineField({
          name: 'kppLcoe',
          title: 'KPP LCOE ($/MWh)',
          type: 'number',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'dieselLcoe',
          title: 'Diesel LCOE ($/MWh)',
          type: 'number',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'solarLcoe',
          title: 'Solar LCOE ($/MWh)',
          type: 'number',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'gasLcoe',
          title: 'Gas LCOE ($/MWh)',
          type: 'number',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'comparisonNotes',
          title: 'Comparison Notes',
          type: 'text',
        }),
      ],
    }),
    defineField({
      name: 'fuelSavings',
      title: 'Fuel Cost Savings',
      type: 'object',
      fields: [
        defineField({
          name: 'annualSavings',
          title: 'Annual Fuel Savings ($)',
          type: 'number',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'savingsPerMWh',
          title: 'Savings per MWh ($)',
          type: 'number',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'fuelType',
          title: 'Fuel Type Replaced',
          type: 'string',
          options: {
            list: [
              { title: 'Diesel', value: 'diesel' },
              { title: 'Natural Gas', value: 'natural-gas' },
              { title: 'Heavy Fuel Oil', value: 'hfo' },
              { title: 'Coal', value: 'coal' },
            ],
          },
        }),
        defineField({
          name: 'calculationMethod',
          title: 'Calculation Method',
          type: 'text',
        }),
      ],
    }),
    defineField({
      name: 'omCosts',
      title: 'O&M Costs',
      type: 'object',
      fields: [
        defineField({
          name: 'kppOmCost',
          title: 'KPP O&M Cost ($/MWh)',
          type: 'number',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'conventionalOmCost',
          title: 'Conventional O&M Cost ($/MWh)',
          type: 'number',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'costBreakdown',
          title: 'Cost Breakdown',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'category',
                  title: 'Category',
                  type: 'string',
                }),
                defineField({
                  name: 'kppCost',
                  title: 'KPP Cost ($/MWh)',
                  type: 'number',
                }),
                defineField({
                  name: 'conventionalCost',
                  title: 'Conventional Cost ($/MWh)',
                  type: 'number',
                }),
              ],
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'roiProjections',
      title: 'ROI Projections',
      type: 'object',
      fields: [
        defineField({
          name: 'initialInvestment',
          title: 'Initial Investment ($)',
          type: 'number',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'paybackPeriod',
          title: 'Payback Period (years)',
          type: 'number',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'annualROI',
          title: 'Annual ROI (%)',
          type: 'number',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'tenYearROI',
          title: '10-Year ROI (%)',
          type: 'number',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'projectionNotes',
          title: 'Projection Notes',
          type: 'text',
        }),
      ],
    }),
    defineField({
      name: 'investmentOpportunities',
      title: 'Investment Opportunities',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'opportunityType',
              title: 'Opportunity Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Project Investment', value: 'project' },
                  { title: 'Technology Licensing', value: 'licensing' },
                  { title: 'Joint Venture', value: 'joint-venture' },
                  { title: 'Equipment Supply', value: 'equipment' },
                ],
              },
            }),
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
            }),
            defineField({
              name: 'minimumInvestment',
              title: 'Minimum Investment ($)',
              type: 'number',
            }),
            defineField({
              name: 'expectedReturn',
              title: 'Expected Return (%)',
              type: 'number',
            }),
            defineField({
              name: 'timeline',
              title: 'Timeline',
              type: 'string',
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'regionalAnalysis',
      title: 'Regional Market Analysis',
      type: 'object',
      fields: [
        defineField({
          name: 'region',
          title: 'Region',
          type: 'string',
          options: {
            list: [
              { title: 'Iraq', value: 'iraq' },
              { title: 'Middle East', value: 'middle-east' },
              { title: 'North Africa', value: 'north-africa' },
              { title: 'Asia Pacific', value: 'asia-pacific' },
              { title: 'Global', value: 'global' },
            ],
          },
        }),
        defineField({
          name: 'marketSize',
          title: 'Market Size (MW)',
          type: 'number',
        }),
        defineField({
          name: 'growthRate',
          title: 'Annual Growth Rate (%)',
          type: 'number',
        }),
        defineField({
          name: 'keyDrivers',
          title: 'Key Market Drivers',
          type: 'array',
          of: [{ type: 'string' }],
        }),
        defineField({
          name: 'challenges',
          title: 'Market Challenges',
          type: 'array',
          of: [{ type: 'string' }],
        }),
      ],
    }),
    defineField({
      name: 'content',
      title: 'Detailed Content',
      type: 'array',
      of: [
        {
          type: 'block',
        },
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      summary: 'summary',
    },
    prepare(selection) {
      const { title, summary } = selection
      return {
        title: title,
        subtitle: summary,
      }
    },
  },
}) 