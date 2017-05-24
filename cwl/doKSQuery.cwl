# Should make a command similar to:
# java 
#   -Xmx2000m 
#   -cp "/src/StoryTeller/target/StoryTeller-v1.0-jar-with-dependencies.jar" \
#   vu.cltl.storyteller.json.JsonMakeStoryFromTripleData $QUERY \
#   --ks-limit $LIMIT \
#   --ks-service http://130.37.53.35:50053 \
#   --log \
#   --token-index /data/token.index.gz \
#   --eurovoc /src/vua-resources/mapping_eurovoc_skos.label.concept.gz \
#   1> /data/1.json \
#   2> /data/1.err

cwlVersion: v1.0
class: CommandLineTool
baseCommand: java
arguments: ["-Xmx2000m"]
stdout: stdout.txt 
stderr: stderr.txt 
inputs:
  ksQuery:
    type: string
    doc: The KnowledgeStore query input string.
    inputBinding:
      position: 2
      prefix: vu.cltl.storyteller.json.JsonMakeStoryFromTripleData
  ksQuerylimit:
    type: int
    doc: The maximum number of results.
    inputBinding:
      position: 3
      prefix: --ks-limit
  classpath:
    type: File
    doc: The JAR file "StoryTeller-v1.0-jar-with-dependencies.jar"
    inputBinding:
      position: 1
      prefix: -cp
  ksServer:
    type: string
    doc: The Knowledge Store Server address
    inputBinding:
      position: 4
      prefix: --ks-service
  logging:
    type: boolean
    doc: Enable logging of the query. Default true.
    default: true
    inputBinding:
      position: 5
      prefix: --log
  tokenIndex:
    type: File
    doc: The token index file.
    inputBinding:
      position: 6
      prefix: --token-index
  eurovoc:
    type: File
    doc: The eurovoc mapping file.
    inputBinding:
      position: 7
      prefix: --eurovoc

outputs:
  out: 
    type: stdout
  err: 
    type: stderr

#stdout: $(runtime.outdir + '/' + inputs.id + '.json')
#stderr: $(runtime.outdir + '/' + inputs.id + '.err')
